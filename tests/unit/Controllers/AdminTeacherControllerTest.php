<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Models\Teacher;
use Testing\Traits\DatabaseTruncate;

class AdminTeacherControllerTest extends TestCase
{
    use WithoutMiddleware;
    use DatabaseTruncate;

    public function testCreateTeacher()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $school = factory(App\Models\School::class)->create();
        $userId = $user->id;
        $schoolId = $school->id;

        // when
        $response = $this->call('POST', 'api/teacher', [
            'user_id' => $userId,
            'school_id' => $schoolId,
        ]);

        // then
        $this->assertResponseStatus(201);
        $this->seeInDatabase('teachers', [
            'user_id' => $userId,
            'school_id' => $schoolId,
        ]);
    }

    public function testUpdateTeacher()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $school = factory(App\Models\School::class)->create(['domain_name' => 'first']);
        $userId = $user->id;
        $schoolId = $school->id;

        $newUser = factory(App\Models\User::class)->create();
        $newSchool = factory(App\Models\School::class)->create(['domain_name' => 'second']);

        $teacher = factory(App\Models\Teacher::class)->create(['user_id' => $userId, 'school_id' => $schoolId]);

        // when
        $response = $this->call('PUT', 'api/teacher/'.$teacher->id, [
            'teacher_id' => $teacher->id,
            'user_id' => $newUser->id,
            'school_id' => $newSchool->id
        ]);

        // then
        $this->assertResponseStatus(200);
        $this->seeInDatabase('teachers', [
            'user_id' => $newUser->id,
            'school_id' => $newSchool->id
        ]);
    }

    public function testDeleteTeacher()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $school = factory(App\Models\School::class)->create(['domain_name' => 'third']);
        $userId = $user->id;
        $schoolId = $school->id;

        $teacher = factory(App\Models\Teacher::class)->create(['user_id' => $userId, 'school_id' => $schoolId]);

        // when
        $response = $this->call('DELETE', 'api/teacher/'.$teacher->id);

        // then
        $this->assertResponseStatus(200);
        $deletedTeacher = Teacher::onlyTrashed()->get()->filter(function($current) use ($teacher) {
            return $current->id == $teacher->id;
        })->first();
        $this->assertNotNull($deletedTeacher->deleted_at);
    }
}
