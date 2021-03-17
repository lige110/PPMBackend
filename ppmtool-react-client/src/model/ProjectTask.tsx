export default interface ProjectTask {
  id?: number;
  summary: string;
  status: string;
  acceptanceCriteria: string;
  priority: number;
  dueDate: string;
  projectIdentifier: string;
  projectSequence?: string;
}
