export enum FlightRequestStatusEnum {
  pending = 'pending',
  approvedByAdmin = 'approvedByAdmin',
  declinedByAdmin = 'declinedByAdmin',
  editedByAdmin = 'editedByAdmin',

  approvedByUser = 'approvedByUser',
  declinedByUser = 'declinedByUser',
  canceled = 'canceled',
}
