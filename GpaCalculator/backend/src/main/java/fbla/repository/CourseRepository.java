package fbla.repository;

import java.util.List;
import fbla.model.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<CourseEntity, Long> {

    List<CourseEntity> findByEmail(String email);

}
