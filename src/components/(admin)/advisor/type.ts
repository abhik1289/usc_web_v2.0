export interface AdvisorMember {
  id: number;
  name: string;
  title: string;
  photo: File | null;
  type: 'advisor' | 'mentor';
  additionalInfo?: string;
}

export interface AdvisorDialogProps {
  onClose: () => void;
  onSubmit: (member: AdvisorMember) => void;
  editingMember?: AdvisorMember | null;
}
