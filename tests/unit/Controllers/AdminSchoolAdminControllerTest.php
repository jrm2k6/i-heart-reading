<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Models\SchoolAdmin;

class AdminSchoolAdminControllerTest extends TestCase
{
    use WithoutMiddleware;

    public function testCreateAdmin()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain1']);
        $userId = $user->id;
        $schoolId = $school->id;

        // when
        $response = $this->call('POST', 'api/administrator', [
            'user_id' => $userId,
            'school_id' => $schoolId,
        ]);

        // then
        $this->assertResponseStatus(201);
        $this->seeInDatabase('school_admins', [
            'user_id' => $userId,
            'school_id' => $schoolId,
        ]);
    }

    public function testUpdateAdmin()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain2']);
        $userId = $user->id;
        $schoolId = $school->id;

        $newUser = factory(App\Models\User::class)->create();
        $newSchool = factory(App\Models\School::class)->create(['domain_name' => 'domain3']);

        $administrator = factory(App\Models\SchoolAdmin::class)->create(['user_id' => $userId, 'school_id' => $schoolId]);

        // when
        $response = $this->call('PUT', 'api/administrator/'.$administrator->id, [
            'administrator_id' => $administrator->id,
            'user_id' => $newUser->id,
            'school_id' => $newSchool->id
        ]);

        // then
        $this->assertResponseStatus(200);
        $this->seeInDatabase('school_admins', [
            'user_id' => $newUser->id,
            'school_id' => $newSchool->id,
            'id' => $administrator->id
        ]);
    }

    public function testDeleteAdmin()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain4']);
        $userId = $user->id;
        $schoolId = $school->id;

        $admin = factory(App\Models\SchoolAdmin::class)->create(['user_id' => $userId, 'school_id' => $schoolId]);

        // when
        $response = $this->call('DELETE', 'api/administrator/'.$admin->id);

        // then
        $this->assertResponseStatus(200);
        $deletedAdmin = SchoolAdmin::onlyTrashed()->get()->filter(function($current) use ($admin) {
            return $current->id == $admin->id;
        })->first();
        $this->assertNotNull($deletedAdmin->deleted_at);
    }
}
