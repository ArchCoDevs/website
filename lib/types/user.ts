export interface User {
  /**
   * The user's first name
   */
  first_name: string;
  /**
   * The user's last name
   */
  last_name: string;
  /**
   * The user's email address (also used as the username)
   */
  username: string;
  /**
   * The user's password (hashed)
   */
  password: string;
  /**
   * The users phone number
   */
  phone?: string;
  /**
   * The user's id (uuid)
   */
  id: string;
}

export default User;
