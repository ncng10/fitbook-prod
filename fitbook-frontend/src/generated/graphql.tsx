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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  personalFeedItems: Array<DashboardFeed>;
  exercisesInAWorkout: Array<Exercise>;
  pendingFriends: Array<User>;
  myFriends: Array<UserFriends>;
  friendsList: Array<User>;
  group: Group;
  groups: Array<Group>;
  isMember: Array<Group>;
  viewPersonalMessages: Array<PersonalMessage>;
  inboxMessages: Array<PersonalMessage>;
  myPrograms: Array<Program>;
  program: Program;
  programsSharedWithMe: Array<Program>;
  programsSharedWithMeBySpecificUser: Array<Program>;
  programSharedWithMe: Array<Program>;
  hello: Scalars['String'];
  me: User;
  userProfile: User;
  searchUsers: User;
  publicUserProfile: User;
  whoIAmMessaging: User;
  workouts: Array<Workout>;
  workout: Workout;
};


export type QueryExercisesInAWorkoutArgs = {
  workoutId: Scalars['Int'];
};


export type QueryMyFriendsArgs = {
  input: Scalars['Int'];
};


export type QueryGroupArgs = {
  id: Scalars['Int'];
};


export type QueryViewPersonalMessagesArgs = {
  senderId: Scalars['Int'];
};


export type QueryProgramArgs = {
  input: Scalars['Int'];
};


export type QueryProgramsSharedWithMeBySpecificUserArgs = {
  input: Scalars['Int'];
};


export type QueryProgramSharedWithMeArgs = {
  input: Scalars['Int'];
};


export type QuerySearchUsersArgs = {
  search: Scalars['String'];
};


export type QueryPublicUserProfileArgs = {
  input: Scalars['String'];
};


export type QueryWhoIAmMessagingArgs = {
  userId: Scalars['Int'];
};


export type QueryWorkoutsArgs = {
  programId: Scalars['Int'];
};


export type QueryWorkoutArgs = {
  workoutId: Scalars['Int'];
};

export type DashboardFeed = {
  __typename?: 'DashboardFeed';
  id: Scalars['Float'];
  notificationKey: Scalars['Float'];
  creatorId: Scalars['Float'];
  user: Scalars['String'];
  date: Scalars['DateTime'];
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
  programIdentity: Scalars['Float'];
  workoutDate: Scalars['String'];
  creatorId: Scalars['Float'];
  workoutName: Scalars['String'];
  workoutCategory: Scalars['String'];
  workoutCompleted: Scalars['Boolean'];
  isShared: Scalars['Boolean'];
  exercises: Array<Exercise>;
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

export type UserFriends = {
  __typename?: 'UserFriends';
  userOneIdentity: Scalars['Float'];
  userTwoIdentity: Scalars['Float'];
  friendshipStatus: Scalars['Float'];
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
  members: Array<User>;
};


export type GroupMembersArgs = {
  groupId: Scalars['Int'];
};

export type PersonalMessage = {
  __typename?: 'PersonalMessage';
  id: Scalars['Float'];
  recipientId: Scalars['Float'];
  recipient: Scalars['String'];
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
  sharedWith: Array<User>;
  workoutsInAProgram: Array<Workout>;
};


export type ProgramSharedWithArgs = {
  input: Scalars['Int'];
};


export type ProgramWorkoutsInAProgramArgs = {
  input: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExerciseToWorkout: Array<Exercise>;
  addFriend: Scalars['Boolean'];
  acceptFriendRequest: Scalars['Boolean'];
  createGroup: Group;
  joinGroup: Array<GroupMembers>;
  sendPersonalMessage: Scalars['Boolean'];
  addProfilePicture: Scalars['Boolean'];
  createProgram: Array<Program>;
  shareProgram: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createWorkout: Array<Workout>;
};


export type MutationAddExerciseToWorkoutArgs = {
  input: NewExerciseInput;
};


export type MutationAddFriendArgs = {
  AddFriendInput: AddFriendInput;
};


export type MutationAcceptFriendRequestArgs = {
  userOneIdentity: Scalars['Int'];
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


export type MutationShareProgramArgs = {
  input: ShareProgramInput;
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

export type AddFriendInput = {
  userTwoIdentity: Scalars['Float'];
  friendshipStatus: Scalars['Float'];
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

export type ShareProgramInput = {
  sharedToId: Scalars['Float'];
  programId: Scalars['Float'];
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
  programIdentity: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newFriendRequest: UserFriends;
  newMessage: PersonalMessage;
  newSharedProgram: SharedProgram;
};

export type SharedProgram = {
  __typename?: 'SharedProgram';
  id: Scalars['Float'];
  sharedById: Scalars['Float'];
  sharedToId: Scalars['Float'];
  programId: Scalars['Float'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type AcceptFriendRequestMutationVariables = Exact<{
  userOneIdentity: Scalars['Int'];
}>;


export type AcceptFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptFriendRequest'>
);

export type AddExerciseToWorkoutMutationVariables = Exact<{
  input: NewExerciseInput;
}>;


export type AddExerciseToWorkoutMutation = (
  { __typename?: 'Mutation' }
  & { addExerciseToWorkout: Array<(
    { __typename?: 'Exercise' }
    & Pick<Exercise, 'id' | 'workoutIdentity' | 'exerciseName' | 'weight' | 'sets' | 'reps' | 'time' | 'rpe' | 'notes'>
  )> }
);

export type AddFriendMutationVariables = Exact<{
  input: AddFriendInput;
}>;


export type AddFriendMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addFriend'>
);

export type AddProfilePictureMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type AddProfilePictureMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addProfilePicture'>
);

export type CreateWorkoutMutationVariables = Exact<{
  input: CreateWorkoutInput;
}>;


export type CreateWorkoutMutation = (
  { __typename?: 'Mutation' }
  & { createWorkout: Array<(
    { __typename?: 'Workout' }
    & Pick<Workout, 'id' | 'programIdentity' | 'workoutDate' | 'creatorId' | 'workoutName' | 'isShared' | 'workoutCompleted' | 'workoutCategory'>
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

export type ShareProgramMutationVariables = Exact<{
  input: ShareProgramInput;
}>;


export type ShareProgramMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'shareProgram'>
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
  workoutId: Scalars['Int'];
}>;


export type ExercisesInAWorkoutQuery = (
  { __typename?: 'Query' }
  & { exercisesInAWorkout: Array<(
    { __typename?: 'Exercise' }
    & Pick<Exercise, 'exerciseName' | 'weight' | 'sets' | 'reps' | 'time' | 'rpe' | 'notes' | 'workoutIdentity' | 'id'>
  )> }
);

export type FriendsListQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsListQuery = (
  { __typename?: 'Query' }
  & { friendsList: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'id' | 'profilePicture'>
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
    & Pick<PersonalMessage, 'sender' | 'senderId' | 'recipient' | 'recipientId'>
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

export type MyFriendsQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type MyFriendsQuery = (
  { __typename?: 'Query' }
  & { myFriends: Array<(
    { __typename?: 'UserFriends' }
    & Pick<UserFriends, 'userTwoIdentity' | 'userOneIdentity' | 'friendshipStatus'>
  )> }
);

export type MyProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProgramsQuery = (
  { __typename?: 'Query' }
  & { myPrograms: Array<(
    { __typename?: 'Program' }
    & Pick<Program, 'programName' | 'programCategory' | 'id' | 'isShared' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
    ) }
  )> }
);

export type PendingFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingFriendsQuery = (
  { __typename?: 'Query' }
  & { pendingFriends: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'id' | 'profilePicture'>
  )> }
);

export type PersonalFeedItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonalFeedItemsQuery = (
  { __typename?: 'Query' }
  & { personalFeedItems: Array<(
    { __typename?: 'DashboardFeed' }
    & Pick<DashboardFeed, 'notificationKey' | 'user' | 'id' | 'creatorId' | 'date'>
  )> }
);

export type ProgramQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type ProgramQuery = (
  { __typename?: 'Query' }
  & { program: (
    { __typename?: 'Program' }
    & Pick<Program, 'id' | 'programName' | 'programCategory' | 'isShared'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
    ), sharedWith: Array<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) }
);

export type ProgramsSharedWithMeQueryVariables = Exact<{ [key: string]: never; }>;


export type ProgramsSharedWithMeQuery = (
  { __typename?: 'Query' }
  & { programsSharedWithMe: Array<(
    { __typename?: 'Program' }
    & Pick<Program, 'id' | 'programName' | 'programCategory' | 'isShared'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    ) }
  )> }
);

export type ProgramsSharedWithMeBySpecificUserQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type ProgramsSharedWithMeBySpecificUserQuery = (
  { __typename?: 'Query' }
  & { programsSharedWithMeBySpecificUser: Array<(
    { __typename?: 'Program' }
    & Pick<Program, 'id' | 'programName' | 'programCategory' | 'isShared'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    ) }
  )> }
);

export type PublicUserProfileQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type PublicUserProfileQuery = (
  { __typename?: 'Query' }
  & { publicUserProfile: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'profilePicture' | 'id'>
  ) }
);

export type SearchUsersQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type SearchUsersQuery = (
  { __typename?: 'Query' }
  & { searchUsers: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'profilePicture' | 'id'>
  ) }
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

export type WhoIAmMessagingQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type WhoIAmMessagingQuery = (
  { __typename?: 'Query' }
  & { whoIAmMessaging: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'profilePicture'>
  ) }
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

export type NewFriendRequestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewFriendRequestSubscription = (
  { __typename?: 'Subscription' }
  & { newFriendRequest: (
    { __typename?: 'UserFriends' }
    & Pick<UserFriends, 'userTwoIdentity' | 'userOneIdentity' | 'friendshipStatus'>
  ) }
);

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'PersonalMessage' }
    & Pick<PersonalMessage, 'sender' | 'text' | 'recipientId' | 'senderId'>
  ) }
);

export type NewSharedProgramSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewSharedProgramSubscription = (
  { __typename?: 'Subscription' }
  & { newSharedProgram: (
    { __typename?: 'SharedProgram' }
    & Pick<SharedProgram, 'sharedById' | 'sharedToId' | 'programId' | 'id'>
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($userOneIdentity: Int!) {
  acceptFriendRequest(userOneIdentity: $userOneIdentity)
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      userOneIdentity: // value for 'userOneIdentity'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, baseOptions);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const AddExerciseToWorkoutDocument = gql`
    mutation AddExerciseToWorkout($input: NewExerciseInput!) {
  addExerciseToWorkout(input: $input) {
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddExerciseToWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>) {
        return Apollo.useMutation<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>(AddExerciseToWorkoutDocument, baseOptions);
      }
export type AddExerciseToWorkoutMutationHookResult = ReturnType<typeof useAddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationResult = Apollo.MutationResult<AddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationOptions = Apollo.BaseMutationOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;
export const AddFriendDocument = gql`
    mutation AddFriend($input: AddFriendInput!) {
  addFriend(AddFriendInput: $input)
}
    `;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, baseOptions);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
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
export const CreateWorkoutDocument = gql`
    mutation CreateWorkout($input: CreateWorkoutInput!) {
  createWorkout(input: $input) {
    id
    programIdentity
    workoutDate
    creatorId
    workoutName
    isShared
    workoutCompleted
    workoutCategory
  }
}
    `;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<CreateWorkoutMutation, CreateWorkoutMutationVariables>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
        return Apollo.useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, baseOptions);
      }
export type CreateWorkoutMutationHookResult = ReturnType<typeof useCreateWorkoutMutation>;
export type CreateWorkoutMutationResult = Apollo.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
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
export const ShareProgramDocument = gql`
    mutation ShareProgram($input: ShareProgramInput!) {
  shareProgram(input: $input)
}
    `;
export type ShareProgramMutationFn = Apollo.MutationFunction<ShareProgramMutation, ShareProgramMutationVariables>;

/**
 * __useShareProgramMutation__
 *
 * To run a mutation, you first call `useShareProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareProgramMutation, { data, loading, error }] = useShareProgramMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useShareProgramMutation(baseOptions?: Apollo.MutationHookOptions<ShareProgramMutation, ShareProgramMutationVariables>) {
        return Apollo.useMutation<ShareProgramMutation, ShareProgramMutationVariables>(ShareProgramDocument, baseOptions);
      }
export type ShareProgramMutationHookResult = ReturnType<typeof useShareProgramMutation>;
export type ShareProgramMutationResult = Apollo.MutationResult<ShareProgramMutation>;
export type ShareProgramMutationOptions = Apollo.BaseMutationOptions<ShareProgramMutation, ShareProgramMutationVariables>;
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
    query ExercisesInAWorkout($workoutId: Int!) {
  exercisesInAWorkout(workoutId: $workoutId) {
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
 *      workoutId: // value for 'workoutId'
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
export const FriendsListDocument = gql`
    query FriendsList {
  friendsList {
    username
    email
    id
    profilePicture
  }
}
    `;

/**
 * __useFriendsListQuery__
 *
 * To run a query within a React component, call `useFriendsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsListQuery(baseOptions?: Apollo.QueryHookOptions<FriendsListQuery, FriendsListQueryVariables>) {
        return Apollo.useQuery<FriendsListQuery, FriendsListQueryVariables>(FriendsListDocument, baseOptions);
      }
export function useFriendsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsListQuery, FriendsListQueryVariables>) {
          return Apollo.useLazyQuery<FriendsListQuery, FriendsListQueryVariables>(FriendsListDocument, baseOptions);
        }
export type FriendsListQueryHookResult = ReturnType<typeof useFriendsListQuery>;
export type FriendsListLazyQueryHookResult = ReturnType<typeof useFriendsListLazyQuery>;
export type FriendsListQueryResult = Apollo.QueryResult<FriendsListQuery, FriendsListQueryVariables>;
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
    recipient
    recipientId
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
export const MyFriendsDocument = gql`
    query MyFriends($input: Int!) {
  myFriends(input: $input) {
    userTwoIdentity
    userOneIdentity
    friendshipStatus
  }
}
    `;

/**
 * __useMyFriendsQuery__
 *
 * To run a query within a React component, call `useMyFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFriendsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyFriendsQuery(baseOptions: Apollo.QueryHookOptions<MyFriendsQuery, MyFriendsQueryVariables>) {
        return Apollo.useQuery<MyFriendsQuery, MyFriendsQueryVariables>(MyFriendsDocument, baseOptions);
      }
export function useMyFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFriendsQuery, MyFriendsQueryVariables>) {
          return Apollo.useLazyQuery<MyFriendsQuery, MyFriendsQueryVariables>(MyFriendsDocument, baseOptions);
        }
export type MyFriendsQueryHookResult = ReturnType<typeof useMyFriendsQuery>;
export type MyFriendsLazyQueryHookResult = ReturnType<typeof useMyFriendsLazyQuery>;
export type MyFriendsQueryResult = Apollo.QueryResult<MyFriendsQuery, MyFriendsQueryVariables>;
export const MyProgramsDocument = gql`
    query MyPrograms {
  myPrograms {
    programName
    programCategory
    id
    isShared
    createdAt
    updatedAt
    creator {
      username
      id
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
export const PendingFriendsDocument = gql`
    query PendingFriends {
  pendingFriends {
    username
    email
    id
    profilePicture
  }
}
    `;

/**
 * __usePendingFriendsQuery__
 *
 * To run a query within a React component, call `usePendingFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePendingFriendsQuery(baseOptions?: Apollo.QueryHookOptions<PendingFriendsQuery, PendingFriendsQueryVariables>) {
        return Apollo.useQuery<PendingFriendsQuery, PendingFriendsQueryVariables>(PendingFriendsDocument, baseOptions);
      }
export function usePendingFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingFriendsQuery, PendingFriendsQueryVariables>) {
          return Apollo.useLazyQuery<PendingFriendsQuery, PendingFriendsQueryVariables>(PendingFriendsDocument, baseOptions);
        }
export type PendingFriendsQueryHookResult = ReturnType<typeof usePendingFriendsQuery>;
export type PendingFriendsLazyQueryHookResult = ReturnType<typeof usePendingFriendsLazyQuery>;
export type PendingFriendsQueryResult = Apollo.QueryResult<PendingFriendsQuery, PendingFriendsQueryVariables>;
export const PersonalFeedItemsDocument = gql`
    query PersonalFeedItems {
  personalFeedItems {
    notificationKey
    user
    id
    creatorId
    date
  }
}
    `;

/**
 * __usePersonalFeedItemsQuery__
 *
 * To run a query within a React component, call `usePersonalFeedItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonalFeedItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonalFeedItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonalFeedItemsQuery(baseOptions?: Apollo.QueryHookOptions<PersonalFeedItemsQuery, PersonalFeedItemsQueryVariables>) {
        return Apollo.useQuery<PersonalFeedItemsQuery, PersonalFeedItemsQueryVariables>(PersonalFeedItemsDocument, baseOptions);
      }
export function usePersonalFeedItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonalFeedItemsQuery, PersonalFeedItemsQueryVariables>) {
          return Apollo.useLazyQuery<PersonalFeedItemsQuery, PersonalFeedItemsQueryVariables>(PersonalFeedItemsDocument, baseOptions);
        }
export type PersonalFeedItemsQueryHookResult = ReturnType<typeof usePersonalFeedItemsQuery>;
export type PersonalFeedItemsLazyQueryHookResult = ReturnType<typeof usePersonalFeedItemsLazyQuery>;
export type PersonalFeedItemsQueryResult = Apollo.QueryResult<PersonalFeedItemsQuery, PersonalFeedItemsQueryVariables>;
export const ProgramDocument = gql`
    query Program($input: Int!) {
  program(input: $input) {
    id
    creator {
      username
      id
    }
    programName
    programCategory
    isShared
    sharedWith(input: $input) {
      username
      id
      profilePicture
    }
  }
}
    `;

/**
 * __useProgramQuery__
 *
 * To run a query within a React component, call `useProgramQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProgramQuery(baseOptions: Apollo.QueryHookOptions<ProgramQuery, ProgramQueryVariables>) {
        return Apollo.useQuery<ProgramQuery, ProgramQueryVariables>(ProgramDocument, baseOptions);
      }
export function useProgramLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramQuery, ProgramQueryVariables>) {
          return Apollo.useLazyQuery<ProgramQuery, ProgramQueryVariables>(ProgramDocument, baseOptions);
        }
export type ProgramQueryHookResult = ReturnType<typeof useProgramQuery>;
export type ProgramLazyQueryHookResult = ReturnType<typeof useProgramLazyQuery>;
export type ProgramQueryResult = Apollo.QueryResult<ProgramQuery, ProgramQueryVariables>;
export const ProgramsSharedWithMeDocument = gql`
    query ProgramsSharedWithMe {
  programsSharedWithMe {
    id
    programName
    programCategory
    isShared
    creator {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useProgramsSharedWithMeQuery__
 *
 * To run a query within a React component, call `useProgramsSharedWithMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramsSharedWithMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramsSharedWithMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useProgramsSharedWithMeQuery(baseOptions?: Apollo.QueryHookOptions<ProgramsSharedWithMeQuery, ProgramsSharedWithMeQueryVariables>) {
        return Apollo.useQuery<ProgramsSharedWithMeQuery, ProgramsSharedWithMeQueryVariables>(ProgramsSharedWithMeDocument, baseOptions);
      }
export function useProgramsSharedWithMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramsSharedWithMeQuery, ProgramsSharedWithMeQueryVariables>) {
          return Apollo.useLazyQuery<ProgramsSharedWithMeQuery, ProgramsSharedWithMeQueryVariables>(ProgramsSharedWithMeDocument, baseOptions);
        }
export type ProgramsSharedWithMeQueryHookResult = ReturnType<typeof useProgramsSharedWithMeQuery>;
export type ProgramsSharedWithMeLazyQueryHookResult = ReturnType<typeof useProgramsSharedWithMeLazyQuery>;
export type ProgramsSharedWithMeQueryResult = Apollo.QueryResult<ProgramsSharedWithMeQuery, ProgramsSharedWithMeQueryVariables>;
export const ProgramsSharedWithMeBySpecificUserDocument = gql`
    query ProgramsSharedWithMeBySpecificUser($input: Int!) {
  programsSharedWithMeBySpecificUser(input: $input) {
    id
    programName
    programCategory
    isShared
    creator {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useProgramsSharedWithMeBySpecificUserQuery__
 *
 * To run a query within a React component, call `useProgramsSharedWithMeBySpecificUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramsSharedWithMeBySpecificUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramsSharedWithMeBySpecificUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProgramsSharedWithMeBySpecificUserQuery(baseOptions: Apollo.QueryHookOptions<ProgramsSharedWithMeBySpecificUserQuery, ProgramsSharedWithMeBySpecificUserQueryVariables>) {
        return Apollo.useQuery<ProgramsSharedWithMeBySpecificUserQuery, ProgramsSharedWithMeBySpecificUserQueryVariables>(ProgramsSharedWithMeBySpecificUserDocument, baseOptions);
      }
export function useProgramsSharedWithMeBySpecificUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramsSharedWithMeBySpecificUserQuery, ProgramsSharedWithMeBySpecificUserQueryVariables>) {
          return Apollo.useLazyQuery<ProgramsSharedWithMeBySpecificUserQuery, ProgramsSharedWithMeBySpecificUserQueryVariables>(ProgramsSharedWithMeBySpecificUserDocument, baseOptions);
        }
export type ProgramsSharedWithMeBySpecificUserQueryHookResult = ReturnType<typeof useProgramsSharedWithMeBySpecificUserQuery>;
export type ProgramsSharedWithMeBySpecificUserLazyQueryHookResult = ReturnType<typeof useProgramsSharedWithMeBySpecificUserLazyQuery>;
export type ProgramsSharedWithMeBySpecificUserQueryResult = Apollo.QueryResult<ProgramsSharedWithMeBySpecificUserQuery, ProgramsSharedWithMeBySpecificUserQueryVariables>;
export const PublicUserProfileDocument = gql`
    query PublicUserProfile($input: String!) {
  publicUserProfile(input: $input) {
    username
    profilePicture
    id
  }
}
    `;

/**
 * __usePublicUserProfileQuery__
 *
 * To run a query within a React component, call `usePublicUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicUserProfileQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePublicUserProfileQuery(baseOptions: Apollo.QueryHookOptions<PublicUserProfileQuery, PublicUserProfileQueryVariables>) {
        return Apollo.useQuery<PublicUserProfileQuery, PublicUserProfileQueryVariables>(PublicUserProfileDocument, baseOptions);
      }
export function usePublicUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicUserProfileQuery, PublicUserProfileQueryVariables>) {
          return Apollo.useLazyQuery<PublicUserProfileQuery, PublicUserProfileQueryVariables>(PublicUserProfileDocument, baseOptions);
        }
export type PublicUserProfileQueryHookResult = ReturnType<typeof usePublicUserProfileQuery>;
export type PublicUserProfileLazyQueryHookResult = ReturnType<typeof usePublicUserProfileLazyQuery>;
export type PublicUserProfileQueryResult = Apollo.QueryResult<PublicUserProfileQuery, PublicUserProfileQueryVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($input: String!) {
  searchUsers(search: $input) {
    username
    email
    profilePicture
    id
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, baseOptions);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
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
export const WhoIAmMessagingDocument = gql`
    query WhoIAmMessaging($userId: Int!) {
  whoIAmMessaging(userId: $userId) {
    username
    profilePicture
  }
}
    `;

/**
 * __useWhoIAmMessagingQuery__
 *
 * To run a query within a React component, call `useWhoIAmMessagingQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoIAmMessagingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoIAmMessagingQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useWhoIAmMessagingQuery(baseOptions: Apollo.QueryHookOptions<WhoIAmMessagingQuery, WhoIAmMessagingQueryVariables>) {
        return Apollo.useQuery<WhoIAmMessagingQuery, WhoIAmMessagingQueryVariables>(WhoIAmMessagingDocument, baseOptions);
      }
export function useWhoIAmMessagingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoIAmMessagingQuery, WhoIAmMessagingQueryVariables>) {
          return Apollo.useLazyQuery<WhoIAmMessagingQuery, WhoIAmMessagingQueryVariables>(WhoIAmMessagingDocument, baseOptions);
        }
export type WhoIAmMessagingQueryHookResult = ReturnType<typeof useWhoIAmMessagingQuery>;
export type WhoIAmMessagingLazyQueryHookResult = ReturnType<typeof useWhoIAmMessagingLazyQuery>;
export type WhoIAmMessagingQueryResult = Apollo.QueryResult<WhoIAmMessagingQuery, WhoIAmMessagingQueryVariables>;
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
export const NewFriendRequestDocument = gql`
    subscription NewFriendRequest {
  newFriendRequest {
    userTwoIdentity
    userOneIdentity
    friendshipStatus
  }
}
    `;

/**
 * __useNewFriendRequestSubscription__
 *
 * To run a query within a React component, call `useNewFriendRequestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewFriendRequestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFriendRequestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewFriendRequestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewFriendRequestSubscription, NewFriendRequestSubscriptionVariables>) {
        return Apollo.useSubscription<NewFriendRequestSubscription, NewFriendRequestSubscriptionVariables>(NewFriendRequestDocument, baseOptions);
      }
export type NewFriendRequestSubscriptionHookResult = ReturnType<typeof useNewFriendRequestSubscription>;
export type NewFriendRequestSubscriptionResult = Apollo.SubscriptionResult<NewFriendRequestSubscription>;
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
export const NewSharedProgramDocument = gql`
    subscription NewSharedProgram {
  newSharedProgram {
    sharedById
    sharedToId
    programId
    id
  }
}
    `;

/**
 * __useNewSharedProgramSubscription__
 *
 * To run a query within a React component, call `useNewSharedProgramSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewSharedProgramSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewSharedProgramSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewSharedProgramSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewSharedProgramSubscription, NewSharedProgramSubscriptionVariables>) {
        return Apollo.useSubscription<NewSharedProgramSubscription, NewSharedProgramSubscriptionVariables>(NewSharedProgramDocument, baseOptions);
      }
export type NewSharedProgramSubscriptionHookResult = ReturnType<typeof useNewSharedProgramSubscription>;
export type NewSharedProgramSubscriptionResult = Apollo.SubscriptionResult<NewSharedProgramSubscription>;