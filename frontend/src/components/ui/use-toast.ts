export function useToast() {
  const toast = ({ title, description, variant }: { title: string; description?: string; variant?: string }) => {
    console.log(`[Toast ${variant || 'info'}] ${title} ${description || ''}`);
  };

  return { toast };
}
