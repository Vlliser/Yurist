
export interface PracticeArea {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Achievement {
  label: string;
  value: string;
  description: string;
}

export type ModalType = 'tos' | 'privacy' | 'data' | null;
