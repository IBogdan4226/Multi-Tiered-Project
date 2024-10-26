# PROIECT MULTI-TIERED

## Contributors
- Ionita Bogdan-Marian
- Adina Chirica
- Victor Stoian

---

## Note
There's no `application.properties` file in this repository. You have to manually add it following this format:

```properties
spring.data.mongodb.uri=<mongoAtlasURI>
spring.data.mongodb.database=multitiered
spring.data.mongodb.auto-index-creation=true
jwt.secret=<password>
springdoc.api-docs.path=/api/docs
