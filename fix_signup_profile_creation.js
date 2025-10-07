// FIX SIGNUP PROFILE CREATION
// This JavaScript code ensures profiles are created properly during signup

// Enhanced signup function that ensures profile creation
window.enhancedSignup = async function enhancedSignup(email, password, fullName, phone, companyName, adminCode) {
  try {
    console.log('🔄 Starting enhanced signup process...');
    
    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone ? `+91${phone}` : '',
          company_name: companyName,
        }
      }
    });

    if (error) {
      console.error('❌ Supabase signup error:', error);
      throw error;
    }

    if (data.user) {
      console.log('✅ User created successfully:', data.user.email);
      
      // Determine user role
      let userRole = 'customer';
      if (adminCode === 'ADMIN2024') {
        userRole = 'admin';
      }

      // Wait a moment for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if profile was created by trigger
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileCheckError || !existingProfile) {
        console.log('⚠️ Profile not created by trigger, creating manually...');
        
        // Create profile manually
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: email,
            full_name: fullName || '',
            phone: phone ? `+91${phone}` : '',
            company_name: companyName || '',
            role: userRole,
            status: 'pending_verification',
            username: fullName?.toLowerCase().replace(/\s+/g, '_') || email.split('@')[0],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (profileError) {
          console.error('❌ Manual profile creation error:', profileError);
          
          // Try using the function as fallback
          const { data: functionResult, error: functionError } = await supabase
            .rpc('create_profile_for_existing_user', {
              user_id: data.user.id,
              user_email: email,
              user_full_name: fullName || '',
              user_phone: phone ? `+91${phone}` : '',
              user_company_name: companyName || '',
              user_role: userRole
            });

          if (functionError) {
            console.error('❌ Function profile creation error:', functionError);
            throw new Error('Failed to create user profile');
          } else {
            console.log('✅ Profile created using function:', functionResult);
          }
        } else {
          console.log('✅ Profile created manually');
        }
      } else {
        console.log('✅ Profile already exists:', existingProfile);
        
        // Update profile with additional data if needed
        if (existingProfile.role !== userRole || existingProfile.full_name !== fullName) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              full_name: fullName || existingProfile.full_name,
              phone: phone ? `+91${phone}` : existingProfile.phone,
              company_name: companyName || existingProfile.company_name,
              role: userRole,
              updated_at: new Date().toISOString()
            })
            .eq('id', data.user.id);

          if (updateError) {
            console.error('❌ Profile update error:', updateError);
          } else {
            console.log('✅ Profile updated successfully');
          }
        }
      }

      // Verify profile was created successfully
      const { data: finalProfile, error: finalCheckError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (finalCheckError || !finalProfile) {
        console.error('❌ Final profile check failed:', finalCheckError);
        throw new Error('Profile creation verification failed');
      }

      console.log('✅ Profile creation verified:', finalProfile);

      // Store session and auto-login user
      if (data.session) {
        const completeUserProfile = {
          ...data.user,
          id: data.user.id,
          email: email,
          full_name: fullName || '',
          phone: phone ? `+91${phone}` : '',
          company_name: companyName || '',
          role: userRole,
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        sessionStorage.setItem('simple-auth-session', JSON.stringify({
          user: completeUserProfile,
          access_token: data.session.access_token,
          timestamp: Date.now()
        }));
        
        // Dispatch login event
        window.dispatchEvent(new CustomEvent('user-logged-in', { detail: completeUserProfile }));
        
        console.log('✅ User session stored and login event dispatched');
      }

      return {
        success: true,
        user: data.user,
        profile: finalProfile,
        message: 'Account created and profile set up successfully!'
      };

    } else {
      throw new Error('Account creation failed');
    }
  } catch (error) {
    console.error('❌ Enhanced signup error:', error);
    return {
      success: false,
      error: error.message,
      message: 'An error occurred during account creation'
    };
  }
};

// Function to check and fix missing profiles for existing users
window.fixMissingProfiles = async function fixMissingProfiles() {
  try {
    console.log('🔍 Checking for missing profiles...');
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('ℹ️ No user logged in');
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      console.log('⚠️ Profile missing for user, creating...');
      
      const { data: functionResult, error: functionError } = await supabase
        .rpc('create_profile_for_existing_user', {
          user_id: user.id,
          user_email: user.email,
          user_full_name: user.user_metadata?.full_name || '',
          user_phone: user.user_metadata?.phone || '',
          user_company_name: user.user_metadata?.company_name || '',
          user_role: 'customer'
        });

      if (functionError) {
        console.error('❌ Error creating missing profile:', functionError);
      } else {
        console.log('✅ Missing profile created:', functionResult);
      }
    } else {
      console.log('✅ Profile exists:', profile);
    }
  } catch (error) {
    console.error('❌ Error checking/fixing profiles:', error);
  }
};

// Override the existing signup function
if (window.originalSignup) {
  window.originalSignup = window.originalSignup;
}

// Run profile check on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Enhanced signup system loaded');
  // Check for missing profiles
  window.fixMissingProfiles();
});

console.log('✅ Enhanced signup profile creation system loaded');
