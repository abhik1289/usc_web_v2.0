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
  type: 'tech' | 'nonTech' | string;  // Defining more specific types for 'type'
  name: string;
}

export interface EditingItem {
  type: 'role' | 'domainGroup' | 'domain';  // Explicitly setting type options
  id: number;
  title?: string;  // Optional title for roles
  name?: string;   // Optional name for domain groups and domains
}
