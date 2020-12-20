import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  exercisesInAWorkout: Array<Exercise>;
  group: Group;
  groups: Array<Group>;
  isMember: Array<Group>;
  viewPersonalMessages: Array<PersonalMessage>;
  inboxMessages: Array<PersonalMessage>;
  myPrograms: Array<Program>;
  hello: Scalars['String'];
  me: User;
  userProfile: User;
  workouts: Array<Workout>;
  workout: Workout;
};


export type QueryExercisesInAWorkoutArgs = {
  input: Scalars['Int'];
};


export type QueryGroupArgs = {
  id: Scalars['Int'];
};


export type QueryViewPersonalMessagesArgs = {
  senderId: Scalars['Int'];
};


export type QueryWorkoutsArgs = {
  programId: Scalars['Int'];
};


export type QueryWorkoutArgs = {
  workoutId: Scalars['Int'];
};

export type Exercise = {
  __typename?: 'Exercise';
  id: Scalars['Float'];
  workoutIdentity: Scalars['Float'];
  exerciseName: Scalars['String'];
  weight: Scalars['String'];
  sets: Scalars['String'];
  reps: Scalars['String'];
  time: Scalars['String'];
  rpe: Scalars['String'];
  notes: Scalars['String'];
  workout: Workout;
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['Float'];
  workoutDate: Scalars['String'];
  creatorId: Scalars['Float'];
  workoutName: Scalars['String'];
  workoutCompleted: Scalars['Boolean'];
  isShared: Scalars['Boolean'];
  workoutCategory: Scalars['String'];
  exercises: Array<Exercise>;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['Float'];
  groupName: Scalars['String'];
  groupCategory: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  profilePicture: Scalars['String'];
};

export type PersonalMessage = {
  __typename?: 'PersonalMessage';
  id: Scalars['Float'];
  recipientId: Scalars['Float'];
  senderId: Scalars['Float'];
  sender: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['String'];
};

export type Program = {
  __typename?: 'Program';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  programName: Scalars['String'];
  programCategory: Scalars['String'];
  isShared: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExerciseToWorkout: Array<Exercise>;
  createGroup: Group;
  joinGroup: Array<GroupMembers>;
  sendPersonalMessage: Scalars['Boolean'];
  addProfilePicture: Scalars['Boolean'];
  createProgram: Array<Program>;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createWorkout: Array<Workout>;
  addWorkoutToProgram: Array<ProgramWorkouts>;
};


export type MutationAddExerciseToWorkoutArgs = {
  inputs: NewExerciseInput;
};


export type MutationCreateGroupArgs = {
  input: GroupInput;
};


export type MutationJoinGroupArgs = {
  input: JoinGroupInput;
};


export type MutationSendPersonalMessageArgs = {
  recipientId: Scalars['Int'];
  input: PersonalMessageInput;
};


export type MutationAddProfilePictureArgs = {
  file: Scalars['Upload'];
};


export type MutationCreateProgramArgs = {
  input: ProgramInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  userNameOrEmail: Scalars['String'];
};


export type MutationCreateWorkoutArgs = {
  input: CreateWorkoutInput;
};


export type MutationAddWorkoutToProgramArgs = {
  input: AddWorkoutToProgramInput;
};

export type NewExerciseInput = {
  workoutIdentity: Scalars['Float'];
  exerciseName: Scalars['String'];
  weight: Scalars['String'];
  sets: Scalars['String'];
  reps: Scalars['String'];
  time: Scalars['String'];
  rpe: Scalars['String'];
  notes: Scalars['String'];
};

export type GroupInput = {
  groupName: Scalars['String'];
  groupCategory: Scalars['String'];
};

export type GroupMembers = {
  __typename?: 'GroupMembers';
  memberId: Scalars['Float'];
  groupId: Scalars['Float'];
};

export type JoinGroupInput = {
  groupId: Scalars['Int'];
};

export type PersonalMessageInput = {
  text: Scalars['String'];
};


export type ProgramInput = {
  programName: Scalars['String'];
  programCategory: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CreateWorkoutInput = {
  workoutName: Scalars['String'];
  workoutCategory: Scalars['String'];
  workoutDate: Scalars['String'];
};

export type ProgramWorkouts = {
  __typename?: 'ProgramWorkouts';
  programId: Scalars['Float'];
  workoutId: Scalars['Float'];
};

export type AddWorkoutToProgramInput = {
  workoutId: Scalars['Float'];
  programId: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: PersonalMessage;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type AddExerciseToWorkoutMutationVariables = Exact<{
  inputs: NewExerciseInput;
}>;


export type AddExerciseToWorkoutMutation = (
  { __typename?: 'Mutation' }
  & { addExerciseToWorkout: Array<(
    { __typename?: 'Exercise' }
    & Pick<Exercise, 'id' | 'workoutIdentity' | 'exerciseName' | 'weight' | 'sets' | 'reps' | 'time' | 'rpe' | 'notes'>
  )> }
);

export type AddProfilePictureMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type AddProfilePictureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addProfilePicture'>
);

export type AddWorkoutToProgramMutationVariables = Exact<{
  input: AddWorkoutToProgramInput;
}>;


export type AddWorkoutToProgramMutation = (
  { __typename?: 'Mutation' }
  & { addWorkoutToProgram: Array<(
    { __typename?: 'ProgramWorkouts' }
    & Pick<ProgramWorkouts, 'programId' | 'workoutId'>
  )> }
);

export type CreateGroupMutationVariables = Exact<{
  input: GroupInput;
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: (
    { __typename?: 'Group' }
    & Pick<Group, 'groupName' | 'groupCategory'>
  ) }
);

export type CreateProgramMutationVariables = Exact<{
  input: ProgramInput;
}>;


export type CreateProgramMutation = (
  { __typename?: 'Mutation' }
  & { createProgram: Array<(
    { __typename?: 'Program' }
    & Pick<Program, 'programName' | 'programCategory' | 'id' | 'creatorId'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type JoinGroupMutationVariables = Exact<{
  input: JoinGroupInput;
}>;


export type JoinGroupMutation = (
  { __typename?: 'Mutation' }
  & { joinGroup: Array<(
    { __typename?: 'GroupMembers' }
    & Pick<GroupMembers, 'memberId' | 'groupId'>
  )> }
);

export type LoginMutationVariables = Exact<{
  userNameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email' | 'id' | 'password'>
    )> }
  ) }
);

export type SendPersonalMessageMutationVariables = Exact<{
  recipientId: Scalars['Int'];
  text: PersonalMessageInput;
}>;


export type SendPersonalMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendPersonalMessage'>
);

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = (
  { __typename?: 'Query' }
  & { userProfile: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'profilePicture'>
  ) }
);

export type ExercisesInAWorkoutQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type ExercisesInAWorkoutQuery = (
  { __typename?: 'Query' }
  & { exercisesInAWorkout: Array<(
    { __typename?: 'Exercise' }
    & Pick<Exercise, 'exerciseName' | 'weight' | 'sets' | 'reps' | 'time' | 'rpe' | 'notes' | 'workoutIdentity' | 'id'>
  )> }
);

export type GroupQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GroupQuery = (
  { __typename?: 'Query' }
  & { group: (
    { __typename?: 'Group' }
    & Pick<Group, 'groupName' | 'id' | 'groupCategory'>
  ) }
);

export type GroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'groupName' | 'groupCategory' | 'id'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'email'>
    ) }
  )> }
);

export type InboxMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type InboxMessagesQuery = (
  { __typename?: 'Query' }
  & { inboxMessages: Array<(
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'sender' | 'senderId'>
  )> }
);

export type IsMemberQueryVariables = Exact<{ [key: string]: never; }>;


export type IsMemberQuery = (
  { __typename?: 'Query' }
  & { isMember: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'groupName' | 'id' | 'groupCategory'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  ) }
);

export type MyProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProgramsQuery = (
  { __typename?: 'Query' }
  & { myPrograms: Array<(
    { __typename?: 'Program' }
    & Pick<Program, 'programName' | 'programCategory' | 'id' | 'creatorId'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email'>
    ) }
  )> }
);

export type ViewPersonalMessagesQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type ViewPersonalMessagesQuery = (
  { __typename?: 'Query' }
  & { viewPersonalMessages: Array<(
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'sender' | 'text' | 'senderId' | 'createdAt' | 'recipientId' | 'id'>
  )> }
);

export type WorkoutQueryVariables = Exact<{
  workoutId: Scalars['Int'];
}>;


export type WorkoutQuery = (
  { __typename?: 'Query' }
  & { workout: (
    { __typename?: 'Workout' }
    & Pick<Workout, 'id' | 'workoutDate' | 'creatorId' | 'workoutName' | 'workoutCompleted' | 'workoutCategory' | 'isShared'>
  ) }
);

export type WorkoutsQueryVariables = Exact<{
  programId: Scalars['Int'];
}>;


export type WorkoutsQuery = (
  { __typename?: 'Query' }
  & { workouts: Array<(
    { __typename?: 'Workout' }
    & Pick<Workout, 'workoutName' | 'id' | 'workoutDate' | 'workoutCompleted' | 'workoutCategory' | 'creatorId' | 'isShared'>
  )> }
);

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'sender' | 'text' | 'recipientId' | 'senderId'>
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const AddExerciseToWorkoutDocument = gql`
    mutation AddExerciseToWorkout($inputs: NewExerciseInput!) {
  addExerciseToWorkout(inputs: $inputs) {
    id
    workoutIdentity
    exerciseName
    weight
    sets
    reps
    time
    rpe
    notes
  }
}
    `;
export type AddExerciseToWorkoutMutationFn = Apollo.MutationFunction<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;

/**
 * __useAddExerciseToWorkoutMutation__
 *
 * To run a mutation, you first call `useAddExerciseToWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciseToWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciseToWorkoutMutation, { data, loading, error }] = useAddExerciseToWorkoutMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useAddExerciseToWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>) {
        return Apollo.useMutation<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>(AddExerciseToWorkoutDocument, baseOptions);
      }
export type AddExerciseToWorkoutMutationHookResult = ReturnType<typeof useAddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationResult = Apollo.MutationResult<AddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationOptions = Apollo.BaseMutationOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;
export const AddProfilePictureDocument = gql`
    mutation AddProfilePicture($file: Upload!) {
  addProfilePicture(file: $file)
}
    `;
export type AddProfilePictureMutationFn = Apollo.MutationFunction<AddProfilePictureMutation, AddProfilePictureMutationVariables>;

/**
 * __useAddProfilePictureMutation__
 *
 * To run a mutation, you first call `useAddProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfilePictureMutation, { data, loading, error }] = useAddProfilePictureMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAddProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>) {
        return Apollo.useMutation<AddProfilePictureMutation, AddProfilePictureMutationVariables>(AddProfilePictureDocument, baseOptions);
      }
export type AddProfilePictureMutationHookResult = ReturnType<typeof useAddProfilePictureMutation>;
export type AddProfilePictureMutationResult = Apollo.MutationResult<AddProfilePictureMutation>;
export type AddProfilePictureMutationOptions = Apollo.BaseMutationOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>;
export const AddWorkoutToProgramDocument = gql`
    mutation AddWorkoutToProgram($input: AddWorkoutToProgramInput!) {
  addWorkoutToProgram(input: $input) {
    programId
    workoutId
  }
}
    `;
export type AddWorkoutToProgramMutationFn = Apollo.MutationFunction<AddWorkoutToProgramMutation, AddWorkoutToProgramMutationVariables>;

/**
 * __useAddWorkoutToProgramMutation__
 *
 * To run a mutation, you first call `useAddWorkoutToProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWorkoutToProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWorkoutToProgramMutation, { data, loading, error }] = useAddWorkoutToProgramMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddWorkoutToProgramMutation(baseOptions?: Apollo.MutationHookOptions<AddWorkoutToProgramMutation, AddWorkoutToProgramMutationVariables>) {
        return Apollo.useMutation<AddWorkoutToProgramMutation, AddWorkoutToProgramMutationVariables>(AddWorkoutToProgramDocument, baseOptions);
      }
export type AddWorkoutToProgramMutationHookResult = ReturnType<typeof useAddWorkoutToProgramMutation>;
export type AddWorkoutToProgramMutationResult = Apollo.MutationResult<AddWorkoutToProgramMutation>;
export type AddWorkoutToProgramMutationOptions = Apollo.BaseMutationOptions<AddWorkoutToProgramMutation, AddWorkoutToProgramMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($input: GroupInput!) {
  createGroup(input: $input) {
    groupName
    groupCategory
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, baseOptions);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateProgramDocument = gql`
    mutation CreateProgram($input: ProgramInput!) {
  createProgram(input: $input) {
    programName
    programCategory
    id
    creatorId
    creator {
      username
    }
  }
}
    `;
export type CreateProgramMutationFn = Apollo.MutationFunction<CreateProgramMutation, CreateProgramMutationVariables>;

/**
 * __useCreateProgramMutation__
 *
 * To run a mutation, you first call `useCreateProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProgramMutation, { data, loading, error }] = useCreateProgramMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProgramMutation(baseOptions?: Apollo.MutationHookOptions<CreateProgramMutation, CreateProgramMutationVariables>) {
        return Apollo.useMutation<CreateProgramMutation, CreateProgramMutationVariables>(CreateProgramDocument, baseOptions);
      }
export type CreateProgramMutationHookResult = ReturnType<typeof useCreateProgramMutation>;
export type CreateProgramMutationResult = Apollo.MutationResult<CreateProgramMutation>;
export type CreateProgramMutationOptions = Apollo.BaseMutationOptions<CreateProgramMutation, CreateProgramMutationVariables>;
export const JoinGroupDocument = gql`
    mutation JoinGroup($input: JoinGroupInput!) {
  joinGroup(input: $input) {
    memberId
    groupId
  }
}
    `;
export type JoinGroupMutationFn = Apollo.MutationFunction<JoinGroupMutation, JoinGroupMutationVariables>;

/**
 * __useJoinGroupMutation__
 *
 * To run a mutation, you first call `useJoinGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupMutation, { data, loading, error }] = useJoinGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinGroupMutation(baseOptions?: Apollo.MutationHookOptions<JoinGroupMutation, JoinGroupMutationVariables>) {
        return Apollo.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(JoinGroupDocument, baseOptions);
      }
export type JoinGroupMutationHookResult = ReturnType<typeof useJoinGroupMutation>;
export type JoinGroupMutationResult = Apollo.MutationResult<JoinGroupMutation>;
export type JoinGroupMutationOptions = Apollo.BaseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($userNameOrEmail: String!, $password: String!) {
  login(userNameOrEmail: $userNameOrEmail, password: $password) {
    errors {
      ...RegularError
    }
    user {
      username
      id
      email
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userNameOrEmail: // value for 'userNameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      ...RegularError
    }
    user {
      username
      email
      id
      password
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendPersonalMessageDocument = gql`
    mutation SendPersonalMessage($recipientId: Int!, $text: PersonalMessageInput!) {
  sendPersonalMessage(recipientId: $recipientId, input: $text)
}
    `;
export type SendPersonalMessageMutationFn = Apollo.MutationFunction<SendPersonalMessageMutation, SendPersonalMessageMutationVariables>;

/**
 * __useSendPersonalMessageMutation__
 *
 * To run a mutation, you first call `useSendPersonalMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPersonalMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPersonalMessageMutation, { data, loading, error }] = useSendPersonalMessageMutation({
 *   variables: {
 *      recipientId: // value for 'recipientId'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSendPersonalMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendPersonalMessageMutation, SendPersonalMessageMutationVariables>) {
        return Apollo.useMutation<SendPersonalMessageMutation, SendPersonalMessageMutationVariables>(SendPersonalMessageDocument, baseOptions);
      }
export type SendPersonalMessageMutationHookResult = ReturnType<typeof useSendPersonalMessageMutation>;
export type SendPersonalMessageMutationResult = Apollo.MutationResult<SendPersonalMessageMutation>;
export type SendPersonalMessageMutationOptions = Apollo.BaseMutationOptions<SendPersonalMessageMutation, SendPersonalMessageMutationVariables>;
export const UserProfileDocument = gql`
    query UserProfile {
  userProfile {
    id
    username
    email
    profilePicture
  }
}
    `;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const ExercisesInAWorkoutDocument = gql`
    query ExercisesInAWorkout($input: Int!) {
  exercisesInAWorkout(input: $input) {
    exerciseName
    weight
    sets
    reps
    time
    rpe
    notes
    workoutIdentity
    id
  }
}
    `;

/**
 * __useExercisesInAWorkoutQuery__
 *
 * To run a query within a React component, call `useExercisesInAWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercisesInAWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercisesInAWorkoutQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExercisesInAWorkoutQuery(baseOptions: Apollo.QueryHookOptions<ExercisesInAWorkoutQuery, ExercisesInAWorkoutQueryVariables>) {
        return Apollo.useQuery<ExercisesInAWorkoutQuery, ExercisesInAWorkoutQueryVariables>(ExercisesInAWorkoutDocument, baseOptions);
      }
export function useExercisesInAWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExercisesInAWorkoutQuery, ExercisesInAWorkoutQueryVariables>) {
          return Apollo.useLazyQuery<ExercisesInAWorkoutQuery, ExercisesInAWorkoutQueryVariables>(ExercisesInAWorkoutDocument, baseOptions);
        }
export type ExercisesInAWorkoutQueryHookResult = ReturnType<typeof useExercisesInAWorkoutQuery>;
export type ExercisesInAWorkoutLazyQueryHookResult = ReturnType<typeof useExercisesInAWorkoutLazyQuery>;
export type ExercisesInAWorkoutQueryResult = Apollo.QueryResult<ExercisesInAWorkoutQuery, ExercisesInAWorkoutQueryVariables>;
export const GroupDocument = gql`
    query Group($id: Int!) {
  group(id: $id) {
    groupName
    id
    groupCategory
  }
}
    `;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupQuery(baseOptions: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
        return Apollo.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, baseOptions);
      }
export function useGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
          return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, baseOptions);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<GroupQuery, GroupQueryVariables>;
export const GroupsDocument = gql`
    query Groups {
  groups {
    groupName
    groupCategory
    id
    creator {
      username
      id
      email
    }
  }
}
    `;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
        return Apollo.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, baseOptions);
      }
export function useGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
          return Apollo.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, baseOptions);
        }
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = Apollo.QueryResult<GroupsQuery, GroupsQueryVariables>;
export const InboxMessagesDocument = gql`
    query InboxMessages {
  inboxMessages {
    sender
    senderId
  }
}
    `;

/**
 * __useInboxMessagesQuery__
 *
 * To run a query within a React component, call `useInboxMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInboxMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInboxMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInboxMessagesQuery(baseOptions?: Apollo.QueryHookOptions<InboxMessagesQuery, InboxMessagesQueryVariables>) {
        return Apollo.useQuery<InboxMessagesQuery, InboxMessagesQueryVariables>(InboxMessagesDocument, baseOptions);
      }
export function useInboxMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InboxMessagesQuery, InboxMessagesQueryVariables>) {
          return Apollo.useLazyQuery<InboxMessagesQuery, InboxMessagesQueryVariables>(InboxMessagesDocument, baseOptions);
        }
export type InboxMessagesQueryHookResult = ReturnType<typeof useInboxMessagesQuery>;
export type InboxMessagesLazyQueryHookResult = ReturnType<typeof useInboxMessagesLazyQuery>;
export type InboxMessagesQueryResult = Apollo.QueryResult<InboxMessagesQuery, InboxMessagesQueryVariables>;
export const IsMemberDocument = gql`
    query IsMember {
  isMember {
    groupName
    id
    groupCategory
    creator {
      username
      id
    }
  }
}
    `;

/**
 * __useIsMemberQuery__
 *
 * To run a query within a React component, call `useIsMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsMemberQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsMemberQuery(baseOptions?: Apollo.QueryHookOptions<IsMemberQuery, IsMemberQueryVariables>) {
        return Apollo.useQuery<IsMemberQuery, IsMemberQueryVariables>(IsMemberDocument, baseOptions);
      }
export function useIsMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsMemberQuery, IsMemberQueryVariables>) {
          return Apollo.useLazyQuery<IsMemberQuery, IsMemberQueryVariables>(IsMemberDocument, baseOptions);
        }
export type IsMemberQueryHookResult = ReturnType<typeof useIsMemberQuery>;
export type IsMemberLazyQueryHookResult = ReturnType<typeof useIsMemberLazyQuery>;
export type IsMemberQueryResult = Apollo.QueryResult<IsMemberQuery, IsMemberQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyProgramsDocument = gql`
    query MyPrograms {
  myPrograms {
    programName
    programCategory
    id
    creatorId
    creator {
      username
      email
    }
  }
}
    `;

/**
 * __useMyProgramsQuery__
 *
 * To run a query within a React component, call `useMyProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProgramsQuery(baseOptions?: Apollo.QueryHookOptions<MyProgramsQuery, MyProgramsQueryVariables>) {
        return Apollo.useQuery<MyProgramsQuery, MyProgramsQueryVariables>(MyProgramsDocument, baseOptions);
      }
export function useMyProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProgramsQuery, MyProgramsQueryVariables>) {
          return Apollo.useLazyQuery<MyProgramsQuery, MyProgramsQueryVariables>(MyProgramsDocument, baseOptions);
        }
export type MyProgramsQueryHookResult = ReturnType<typeof useMyProgramsQuery>;
export type MyProgramsLazyQueryHookResult = ReturnType<typeof useMyProgramsLazyQuery>;
export type MyProgramsQueryResult = Apollo.QueryResult<MyProgramsQuery, MyProgramsQueryVariables>;
export const ViewPersonalMessagesDocument = gql`
    query viewPersonalMessages($input: Int!) {
  viewPersonalMessages(senderId: $input) {
    sender
    text
    senderId
    createdAt
    recipientId
    id
  }
}
    `;

/**
 * __useViewPersonalMessagesQuery__
 *
 * To run a query within a React component, call `useViewPersonalMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewPersonalMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewPersonalMessagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useViewPersonalMessagesQuery(baseOptions: Apollo.QueryHookOptions<ViewPersonalMessagesQuery, ViewPersonalMessagesQueryVariables>) {
        return Apollo.useQuery<ViewPersonalMessagesQuery, ViewPersonalMessagesQueryVariables>(ViewPersonalMessagesDocument, baseOptions);
      }
export function useViewPersonalMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewPersonalMessagesQuery, ViewPersonalMessagesQueryVariables>) {
          return Apollo.useLazyQuery<ViewPersonalMessagesQuery, ViewPersonalMessagesQueryVariables>(ViewPersonalMessagesDocument, baseOptions);
        }
export type ViewPersonalMessagesQueryHookResult = ReturnType<typeof useViewPersonalMessagesQuery>;
export type ViewPersonalMessagesLazyQueryHookResult = ReturnType<typeof useViewPersonalMessagesLazyQuery>;
export type ViewPersonalMessagesQueryResult = Apollo.QueryResult<ViewPersonalMessagesQuery, ViewPersonalMessagesQueryVariables>;
export const WorkoutDocument = gql`
    query Workout($workoutId: Int!) {
  workout(workoutId: $workoutId) {
    id
    workoutDate
    creatorId
    workoutName
    workoutCompleted
    workoutCategory
    isShared
  }
}
    `;

/**
 * __useWorkoutQuery__
 *
 * To run a query within a React component, call `useWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutQuery({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useWorkoutQuery(baseOptions: Apollo.QueryHookOptions<WorkoutQuery, WorkoutQueryVariables>) {
        return Apollo.useQuery<WorkoutQuery, WorkoutQueryVariables>(WorkoutDocument, baseOptions);
      }
export function useWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutQuery, WorkoutQueryVariables>) {
          return Apollo.useLazyQuery<WorkoutQuery, WorkoutQueryVariables>(WorkoutDocument, baseOptions);
        }
export type WorkoutQueryHookResult = ReturnType<typeof useWorkoutQuery>;
export type WorkoutLazyQueryHookResult = ReturnType<typeof useWorkoutLazyQuery>;
export type WorkoutQueryResult = Apollo.QueryResult<WorkoutQuery, WorkoutQueryVariables>;
export const WorkoutsDocument = gql`
    query Workouts($programId: Int!) {
  workouts(programId: $programId) {
    workoutName
    id
    workoutDate
    workoutCompleted
    workoutCategory
    creatorId
    isShared
  }
}
    `;

/**
 * __useWorkoutsQuery__
 *
 * To run a query within a React component, call `useWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutsQuery({
 *   variables: {
 *      programId: // value for 'programId'
 *   },
 * });
 */
export function useWorkoutsQuery(baseOptions: Apollo.QueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
        return Apollo.useQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, baseOptions);
      }
export function useWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
          return Apollo.useLazyQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, baseOptions);
        }
export type WorkoutsQueryHookResult = ReturnType<typeof useWorkoutsQuery>;
export type WorkoutsLazyQueryHookResult = ReturnType<typeof useWorkoutsLazyQuery>;
export type WorkoutsQueryResult = Apollo.QueryResult<WorkoutsQuery, WorkoutsQueryVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    sender
    text
    recipientId
    senderId
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, baseOptions);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;