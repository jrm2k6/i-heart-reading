<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Models\StudentsGroup;

class AdminGroupStudentsControllerTest extends TestCase
{
    use WithoutMiddleware;

    public function testCreateGroupStudents()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain1']);
        $schoolGroup = factory(App\Models\SchoolGroup::class)->create(['school_id' => $school->id]);
        $userId = $user->id;
        $schoolGroupId = $schoolGroup->id;
        
        // when
        $response = $this->call('POST', 'api/groups', [
            'user_id' => $userId, 
            'group_id' => $schoolGroupId,
        ]);

        // then
        $this->assertResponseStatus(201);
        $this->seeInDatabase('students_groups', [
            'user_id' => $userId,
            'group_id' => $schoolGroupId,
        ]);
    }

    public function testUpdateGroupStudents()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain2']);
        $school2 = factory(App\Models\School::class)->create(['domain_name' => 'domain3']);
        $schoolGroup = factory(App\Models\SchoolGroup::class)->create(['school_id' => $school->id]);
        $schoolGroup2 = factory(App\Models\SchoolGroup::class)->create(['school_id' => $school2->id]);
        $userId = $user->id;
        $schoolGroupId = $schoolGroup->id;

        $studentGroup = factory(App\Models\StudentsGroup::class)->create(['group_id' => $schoolGroupId, 'user_id' => $userId]);

        // when
        $response = $this->call('PUT', 'api/groups/'.$studentGroup->id, [
            'user_id' => $user->id,
            'group_id' => $schoolGroup2->id, 
            'group_student_id' => $studentGroup->id
        ]);

        // then
        $this->assertResponseStatus(200);
        $this->seeInDatabase('students_groups', [
            'user_id' => $user->id,
            'group_id' => $schoolGroup2->id,
            'id' => $studentGroup->id
        ]);
    }

    public function testDeleteGroupStudents()
    {
        // given
        $user = factory(App\Models\User::class)->create();
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain4']);
        $schoolGroup = factory(App\Models\SchoolGroup::class)->create(['school_id' => $school->id]);
        $userId = $user->id;
        $schoolGroupId = $schoolGroup->id;

        $studentGroup = factory(App\Models\StudentsGroup::class)->create(['group_id' => $schoolGroupId, 'user_id' => $userId]);

        // when
        $response = $this->call('DELETE', 'api/groups/'.$studentGroup->id);

        // then
        $this->assertResponseStatus(200);
        $deletedGroup = StudentsGroup::onlyTrashed()->get()->filter(function($current) use ($studentGroup) {
            return $current->id == $studentGroup->id; 
        })->first();
        $this->assertNotNull($deletedGroup->deleted_at);
    }
}