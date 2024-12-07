export interface Role {
  id: number;
  title: string;
}

export interface DomainGroup {
  id: number;
  name: string;
}

export interface Domain {
  id: number;
  type: string;
  name: string;
}

export interface EditingItem {
  type: 'role' | 'domainGroup' | 'domain';
  id: number;
  title?: string;
  name?: string;
}
