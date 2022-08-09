import { User } from "../user.entity";

export interface iSuperAdmin extends Omit<User, 'airline' & 'submittedFlightRequests' & 'isDeleted' & 'role'> {}
