-- Backup Support Ticket Tables
-- Run this before deleting to save your data

-- Backup support_tickets table
SELECT 
  'support_tickets_backup' as table_name,
  COUNT(*) as record_count
FROM support_tickets;

-- Export support_tickets data (copy this output)
SELECT 
  id,
  ticket_number,
  user_id,
  subject,
  category,
  priority,
  description,
  status,
  assigned_to,
  created_at,
  updated_at,
  resolved_at,
  closed_at,
  admin_notes
FROM support_tickets
ORDER BY created_at;

-- Backup support_ticket_replies table
SELECT 
  'support_ticket_replies_backup' as table_name,
  COUNT(*) as record_count
FROM support_ticket_replies;

-- Export support_ticket_replies data (copy this output)
SELECT 
  id,
  ticket_id,
  user_id,
  is_admin_reply,
  message,
  created_at,
  updated_at
FROM support_ticket_replies
ORDER BY created_at;

-- Backup support_ticket_notifications table
SELECT 
  'support_ticket_notifications_backup' as table_name,
  COUNT(*) as record_count
FROM support_ticket_notifications;

-- Export support_ticket_notifications data (copy this output)
SELECT 
  id,
  user_id,
  ticket_id,
  subject,
  message,
  is_read,
  created_at
FROM support_ticket_notifications
ORDER BY created_at;

-- Show total backup summary
SELECT 
  'TOTAL BACKUP SUMMARY' as summary,
  (SELECT COUNT(*) FROM support_tickets) as tickets_count,
  (SELECT COUNT(*) FROM support_ticket_replies) as replies_count,
  (SELECT COUNT(*) FROM support_ticket_notifications) as notifications_count;
