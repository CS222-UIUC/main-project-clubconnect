# Example User Application Flow
1) User logs into application and obtains JWT
2) JWT is stored in React application
3) A request will be sent to get organizations they are following, and other ones with similar interests
4) They can then interact with the app and follow organizations

## What to do now
- will need to implement keywords for users and organizations
  - these keywords can be validated in a master database and retreieved at application startup
- you can query organizations based on keywords for the user

## What will JWT contain
- Full name of user
- MongoDB _id field
