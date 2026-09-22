export type MemoryPlace = {
  id: string;
  label: string;
  hint: string;
};

export const MEMORY_PLACES: MemoryPlace[] = [
  { id: 'this_computer', label: 'This computer', hint: 'Download and drop into buddy/memory/vault/' },
  { id: 'chats_folder', label: 'Chats folder', hint: 'Download and drop into chats/buddy_memory/' },
  { id: 'project_notes', label: 'Project notes', hint: 'Download and drop into docs/memory/' },
  { id: 'browser_only', label: 'This browser only', hint: 'Stays on this device until you export.' },
  { id: 'custom_folder', label: 'A folder I choose', hint: 'Download, then put the file in any folder you want.' },
  { id: 'usb_drive', label: 'USB or external drive', hint: 'Download, then copy onto your stick or disk.' },
  { id: 'github_export', label: 'GitHub export file', hint: 'Download, review, then send up yourself.' },
  { id: 'google_drive', label: 'Google Drive', hint: 'Download, then put in Drive / Buddy-Memory.' },
  { id: 'google_cloud_storage', label: 'Google Cloud Storage', hint: 'Export first. You upload to your bucket. No keys in the page.' },
  { id: 'icloud_drive', label: 'iCloud Drive', hint: 'Save into iCloud Drive / Buddy-Memory on your Apple device.' },
  { id: 'apple_icloud', label: 'Apple iCloud', hint: 'Same Apple ID across iPhone, iPad, and Mac. Use Files / iCloud Drive.' },
  { id: 'dropbox', label: 'Dropbox', hint: 'Drop the export into Dropbox / Buddy-Memory.' },
  { id: 'onedrive', label: 'Microsoft OneDrive', hint: 'Save into OneDrive / Buddy-Memory.' },
  { id: 'box', label: 'Box', hint: 'Upload the export after you review it.' },
  { id: 'proton_drive', label: 'Proton Drive', hint: 'Export, then upload. Still never store secret keys.' },
  { id: 'amazon_s3', label: 'Amazon S3', hint: 'Export locally, then you upload. Keys stay in your console.' },
  { id: 'azure_blob', label: 'Azure Blob Storage', hint: 'Export first. You place the file in your container.' },
  { id: 'cloudflare_r2', label: 'Cloudflare R2', hint: 'Export, then upload from your Cloudflare account.' },
  { id: 'nextcloud', label: 'Nextcloud or NAS', hint: 'Copy into your home-server Buddy-Memory folder.' },
  { id: 'backblaze_b2', label: 'Backblaze B2', hint: 'Export, review, then upload to your B2 bucket.' },
];
