<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Models\School;
use Testing\Traits\DatabaseTruncate;

class SchoolControllerTest extends TestCase
{
    use WithoutMiddleware;
    use DatabaseTruncate;

    public function testCreateSchool()
    {
        // given
        $schoolName = 'My school';
        $schoolAddress = 'My school address';
        $schoolDomain = 'school.com';
        // when
        $response = $this->call('POST', 'api/school', [
            'name' => $schoolName, 
            'address' => $schoolAddress,
            'domain_name' => $schoolDomain
        ]);

        // then
        $this->assertResponseStatus(201);
        $this->seeInDatabase('schools', [
            'name' => $schoolName,
            'address' => $schoolAddress,
            'domain_name' => $schoolDomain
        ]);
    }

    public function testUpdateSchool()
    {
        // given
        $school = factory(App\Models\School::class)->create();
        $schoolName = 'My school';
        $schoolAddress = 'My school address';
        $schoolDomain = 'updateschool.com';
        // when
        $response = $this->call('PUT', 'api/school/'.$school->id, [
            'name' => $schoolName, 
            'address' => $schoolAddress,
            'domain_name' => $schoolDomain
        ]);

        // then
        $this->assertResponseStatus(200);
        $this->seeInDatabase('schools', [
            'name' => $schoolName,
            'address' => $schoolAddress,
            'domain_name' => $schoolDomain
        ]);
    }

    public function testDeleteSchool()
    {
        // given
        $school = factory(App\Models\School::class)->create();

        // when
        $response = $this->call('DELETE', 'api/school/'.$school->id);

        // then
        $this->assertResponseStatus(200);
        $deletedSchool = School::onlyTrashed()->get()->filter(function($current) use ($school) {
            return $current->id == $school->id; 
        })->first();
        $this->assertNotNull($deletedSchool->deleted_at);
    }
}