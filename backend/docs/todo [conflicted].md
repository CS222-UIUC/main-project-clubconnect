# TODO
- Finish Auth System
- Finalize unit tests for authentication system
- Configure MongoDB firewall for accepting queries from other group members during testing

## Done
- Create MongoDB Instance
- Create AWS instance
- Begin working on authentication system

## TODO for Matt 11/7 -> 11/14
- *Create* GET, POST, PUT, and DELETE routes for organization
- *Plan* how the querying will work for organizations (by _id and name substring)
- *Learn* about pagination for all requests
  - Skip and limit pagination with requests to mongodb (look into how to do this with mongoose)
  - Requests can have query parameters with ranges and links that point to the next offset of items
