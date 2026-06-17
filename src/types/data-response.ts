export interface DataResponse<T> {
  error: string | null;
  data: T | null;
}
