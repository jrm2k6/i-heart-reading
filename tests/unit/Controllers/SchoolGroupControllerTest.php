<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Models\School;
use App\Models\SchoolGroup;

class SchoolGroupControllerTest extends TestCase
{
    use WithoutMiddleware;

    public function testCreateGroupSchool()
    {
        // given
        $school = factory(App\Models\School::class)->create();
        $groupName = 'My group';
        $groupGrade = 'Other';
        $groupNickname = 'My nickname';
        
        // when
        $response = $this->call('POST', 'api/school/group', [
            'name' => $groupName, 
            'grade' => $groupGrade,
            'nickname' => $groupNickname,
            'school_id' => $school->id
        ]);

        // then
        $this->assertResponseStatus(201);
        $this->seeInDatabase('school_groups', [
            'name' => $groupName,
            'grade' => $groupGrade,
            'nickname' => $groupNickname,
            'school_id' => $school->id
        ]);
    }

    public function testUpdateGroupSchool()
    {
        // given
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain2']);
        $schoolGroup = factory(App\Models\SchoolGroup::class)->create(['school_id' => $school->id]);
        $groupName = 'Update Name';
        $groupGrade = 'Other';
        $groupNickname = 'Update Nickname';
        
        // when
        $response = $this->call('PUT', 'api/school/group/'.$schoolGroup->id, [
            'name' => $groupName, 
            'grade' => $groupGrade,
            'nickname' => $groupNickname,
            'school_id' => $school->id
        ]);

        // then
        $this->assertResponseStatus(200);
        $this->seeInDatabase('school_groups', [
            'name' => $groupName,
            'grade' => $groupGrade,
            'nickname' => $groupNickname,
            'school_id' => $school->id
        ]);
    }

    public function testDeleteSchoolGroup()
    {
        // given
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain3']);
        $schoolGroup = factory(App\Models\SchoolGroup::class)->create(['school_id' => $school->id]);

        // when
        $response = $this->call('DELETE', 'api/school/group/'.$schoolGroup->id);

        // then
        $this->assertResponseStatus(200);
        $deletedGroup = SchoolGroup::onlyTrashed()->get()->filter(function($current) use ($schoolGroup) {
            return $current->id == $schoolGroup->id; 
        })->first();
        $this->assertNotNull($deletedGroup->deleted_at);
    }
}