enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor'
}
// custom.d.ts
interface _ISafeUser {
  _id: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}
declare namespace Express {
  interface Request {
    user: _ISafeUser; // Replace with your actual user type
  }
}
