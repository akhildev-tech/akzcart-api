export interface SupabaseResponseInterface {
  data: SupabaseResponseDataInterface;
  error: object | null;
}

interface SupabaseResponseDataInterface {
  user: SupabaseResponseUserDataInterface;
}

export interface SupabaseResponseUserDataInterface {
  id: string;
}
