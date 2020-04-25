export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddToProducerResponse = {
   __typename?: 'AddToProducerResponse';
  status?: Maybe<Scalars['String']>;
};

export type CreateExhibitionResponse = {
   __typename?: 'CreateExhibitionResponse';
  status?: Maybe<Scalars['String']>;
};

export type Exhibition = {
   __typename?: 'Exhibition';
  createdDate?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  exhibitionId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  startDate?: Maybe<Scalars['String']>;
};

export type RootMutation = {
   __typename?: 'RootMutation';
  addToAdmins?: Maybe<AddToAdminResponse>;
  addToProducer?: Maybe<AddToProducerResponse>;
  createExhibition?: Maybe<CreateExhibitionResponse>;
  createUser?: Maybe<CreateUserResponse>;
};


export type RootMutationAddToAdminsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type RootMutationAddToProducerArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type RootMutationCreateExhibitionArgs = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
};


export type RootMutationCreateUserArgs = {
  password: Scalars['String'];
  isActive?: Maybe<Scalars['Boolean']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userName: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  dateOfBirth: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
};

export type AddToAdminResponse = {
   __typename?: 'AddToAdminResponse';
  status?: Maybe<Scalars['String']>;
};

export type RootQuery = {
   __typename?: 'RootQuery';
  admins?: Maybe<Array<Maybe<User>>>;
  audience?: Maybe<Array<Maybe<User>>>;
  exhibitions?: Maybe<Array<Maybe<Exhibition>>>;
  loginUser?: Maybe<User>;
  producers?: Maybe<Array<Maybe<User>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type RootQueryLoginUserArgs = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  dateOfBirth?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type CreateUserResponse = {
   __typename?: 'CreateUserResponse';
  status?: Maybe<Scalars['String']>;
};

export type Unnamed_1_QueryVariables = {};


export type Unnamed_1_Query = (
  { __typename?: 'RootQuery' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'userName'>
  )>>> }
);

