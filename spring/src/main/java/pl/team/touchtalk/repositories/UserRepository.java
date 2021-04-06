package pl.team.touchtalk.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User getUserByEmailAndPassword(String email, String password);

    /*
    * getSaltByEmail method provides user salt necessary for logging in
    *
    * @Param email
    * @Returns salt as String
    * */
    @Query(value = "SELECT u.salt FROM users u WHERE u.email=?1", nativeQuery = true)
    String getSaltByEmail(String email);
}
