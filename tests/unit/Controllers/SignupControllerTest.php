<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Models\School;
use Testing\Traits\DatabaseTruncate;

class SignupControllerTest extends TestCase
{
    use WithoutMiddleware;
    use DatabaseTruncate;

    public function testRegisterOver13yearsOld()
    {
        // given
        $this->withoutEvents();

        $school = factory(App\Models\School::class)->create();
        $signupToken = factory(\App\Models\SignupToken::class, 'student')->create();

        $requestParams = [
            'school_id' => 1,
            'email_id' => 'testemail',
            'name' => 'John Doe',
            'type_token' => 'student',
            'token' => 'abcd',
            'password' => 'mypassword',
            'password_confirmation' => 'mypassword',
            'date_of_birth' => '11/11/1988',
            'accept_terms' => 'on'
        ];

        // when
        $this->call('POST', '/register-token', $requestParams);

        // then
        $this->assertResponseStatus(302);
        $this->assertRedirectedTo('app');
        $this->seeInDatabase('users', [
            'name' => $requestParams['name'],
            'email' => "{$requestParams['email_id']}@{$school->domain_name}",
            'role' => 'student',
            'birth_date' => '1988-11-11'
        ]);
    }

    public function testRegisterUnder13yearsOldWithMissingGuardianEmail()
    {
        // given
        $this->withoutEvents();

        $school = factory(App\Models\School::class)->create();
        $signupToken = factory(\App\Models\SignupToken::class, 'student')->create();
        $dateOfBirthUnder13 = \Carbon\Carbon::now()->subYears(12)->format('m/d/Y');

        $requestParams = [
            'school_id' => 1,
            'email_id' => 'testemail',
            'name' => 'John Doe',
            'type_token' => 'student',
            'token' => 'abcd',
            'password' => 'mypassword',
            'password_confirmation' => 'mypassword',
            'date_of_birth' => $dateOfBirthUnder13,
            'accept_terms' => 'on'
        ];

        // when
        $this->call('POST', '/register-token', $requestParams);

        // then
        $this->assertResponseStatus(302);
        $this->assertRedirectedTo('');
        $this->assertSessionHasErrors(['guardian_email' => 'The guardian email field is required.']);
        $this->dontSeeInDatabase('users', [
            'name' => $requestParams['name'],
            'email' => "{$requestParams['email_id']}@{$school->domain_name}",
            'role' => 'student'
        ]);
    }

    public function testRegisterUnder13yearsOld()
    {
        // given
        $this->withoutEvents();

        $school = factory(App\Models\School::class)->create();
        $signupToken = factory(\App\Models\SignupToken::class, 'student')->create();
        $dateOfBirthUnder13 = \Carbon\Carbon::now()->subYears(12)->format('m/d/Y');

        $requestParams = [
            'school_id' => 1,
            'email_id' => 'testemail',
            'name' => 'John Doe',
            'type_token' => 'student',
            'token' => 'abcd',
            'password' => 'mypassword',
            'password_confirmation' => 'mypassword',
            'date_of_birth' => $dateOfBirthUnder13,
            'guardian_email' => 'myemail@test.com',
            'accept_terms' => 'on'
        ];

        // when
        $this->call('POST', '/register-token', $requestParams);

        // then
        $this->assertResponseStatus(302);
        $this->assertRedirectedTo('app');
        $this->seeInDatabase('users', [
            'name' => $requestParams['name'],
            'email' => "{$requestParams['email_id']}@{$school->domain_name}",
            'role' => 'student',
            'guardian_email' => 'myemail@test.com'
        ]);

    }
}