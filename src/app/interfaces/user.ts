export interface User {
  firstname: String;
  lastname: String;
  email: String;
  password: String;
  role: String;
  birthDate: Date;
  gender: String;
  tokens?: [{ token: String }];
}

export interface Post {
  post: Post;
}
