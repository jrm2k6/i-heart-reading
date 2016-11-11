<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Models\PrimaryContact;

class PrimaryContactControllerTest extends TestCase
{
    use WithoutMiddleware;

    public function testCreatePrimaryContact()
    {
        // given
        $school = factory(App\Models\School::class)->create();
        $contactName = 'John Doe';
        $contactEmail = 'email@school.com';
        $contactRole = 'Principal';
        // when
        $response = $this->call('POST', 'api/school/contact', [
            'name' => $contactName, 
            'email_address' => $contactEmail,
            'role' => $contactRole,
            'school_id' => $school->id
        ]);

        // then
        $this->assertResponseStatus(201);
        $this->seeInDatabase('primary_contacts', [
            'name' => $contactName,
            'email_address' => $contactEmail,
            'role' => $contactRole,
            'school_id' => $school->id
        ]);
    }

    public function testUpdatePrimaryContact()
    {
        // given
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain2']);
        $primaryContact = factory(App\Models\PrimaryContact::class)->create(['school_id' => $school->id]);
        $contactName = 'Update Name';
        $contactEmail = 'update@email.com';
        $contactRole = 'Janitor';
        
        // when
        $response = $this->call('PUT', 'api/school/contact/'.$primaryContact->id, [
            'name' => $contactName, 
            'email_address' => $contactEmail,
            'role' => $contactRole,
            'school_id' => $school->id
        ]);

        // then
        $this->assertResponseStatus(200);
        $this->seeInDatabase('primary_contacts', [
            'name' => $contactName,
            'email_address' => $contactEmail,
            'role' => $contactRole
        ]);
    }

    public function testDeleteSchool()
    {
        // given
        $school = factory(App\Models\School::class)->create(['domain_name' => 'domain3']);
        $primaryContact = factory(App\Models\PrimaryContact::class)->create(['school_id' => $school->id]);

        // when
        $response = $this->call('DELETE', 'api/school/contact/'.$primaryContact->id);

        // then
        $this->assertResponseStatus(200);
        $deletedContact = PrimaryContact::onlyTrashed()->get()->filter(function($current) use ($primaryContact) {
            return $current->id == $primaryContact->id; 
        })->first();
        $this->assertNotNull($deletedContact->deleted_at);
    }
}