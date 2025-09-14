import 'next-auth';
import 'next-auth/jwt';

// Declare modules to extend the default types
declare module 'next-auth' {
  /**
   * Extends the built-in session.user object to include the 'id' property.
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user']; // Keep the default properties like name, email, image
  }

  /**
   * Extends the built-in User model.
   */
  interface User {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extends the JWT token to include the 'id' property.
   */
  interface JWT {
    id: string;
  }
}