<?php

use App\Models\PrimaryContact;
use App\Models\School;
use App\Models\SchoolAdmin;
use App\Models\SchoolGroup;
use App\Models\SignupOrganizationToken;
use App\Models\SignupToken;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoDatabaseSeeder extends Seeder
{
    private $faker;
    private $school1;
    private $school2;
    private $primaryContact1;
    private $primaryContact2;
    private $teacherUser1;
    private $teacherUser2;
    private $teacher1;
    private $teacher2;
    private $adminUser1;
    private $adminUser2;
    private $admin1;
    private $admin2;
    private $studentUser1;
    private $stoken1;
    private $stoken2;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->faker = Faker\Factory::create();
        $this->call(DatabaseSeeder::class);
        $this->createSignupOrganizationTokens();
        $this->createSchools();
        $this->createPrimaryContacts();
        $this->createTeachers();
        $this->createGroups();
        $this->createAdmins();
        $this->createStudents();
        $this->createSignupTokens();
    }

    private function createSignupOrganizationTokens()
    {
        $token1 = str_random(10);
        $this->stoken1 = SignupOrganizationToken::create([
            'token' => $token1
        ]);

        $token2 = str_random(10);
        $this->stoken2 = SignupOrganizationToken::create([
            'token' => $token2
        ]);
    }

    private function createSchools()
    {
        $this->school1 = School::create([
            'name' => $this->faker->company,
            'address' => $this->faker->address,
            'domain_name' => 'unicorn.com',
            'organization_token_id' => $this->stoken1->id
        ]);

        $this->school2 = School::create([
            'name' => $this->faker->company,
            'address' => $this->faker->address,
            'domain_name' => 'rainbow.com',
            'organization_token_id' => $this->stoken2->id
        ]);
    }

    private function createPrimaryContacts()
    {
        $this->primaryContact1 = PrimaryContact::create([
            'name' => $this->faker->name,
            'email_address' => $this->faker->userName . '@' . $this->school1->domain_name,
            'role' => 'Principal',
            'school_id' => $this->school1->id
        ]);

        $this->primaryContact2 = PrimaryContact::create([
            'name' => $this->faker->name,
            'email_address' => $this->faker->userName . '@' . $this->school2->domain_name,
            'role' => 'Principal',
            'school_id' => $this->school1->id
        ]);
    }

    private function createGroups()
    {
        $group1 = SchoolGroup::create([
            'name' => 'K8',
            'grade' => 'K8',
            'nickname' => 'Tuesday Morning',
            'school_id' => $this->school1->id,
            'teacher_id' => $this->teacher1->id
        ]);

        $group2 = SchoolGroup::create([
            'name' => 'K6',
            'grade' => 'K6',
            'nickname' => 'Wednesday',
            'school_id' => $this->school1->id,
            'teacher_id' => $this->teacher1->id
        ]);

        $group3 = SchoolGroup::create([
            'name' => 'SciFi - K8',
            'grade' => 'K8',
            'nickname' => 'SciFi Group',
            'school_id' => $this->school2->id,
            'teacher_id' => $this->teacher2->id
        ]);

        $group4 = SchoolGroup::create([
            'name' => 'K6',
            'grade' => 'K6',
            'nickname' => 'Manga Club',
            'school_id' => $this->school2->id,
            'teacher_id' => $this->teacher2->id
        ]);
    }

    private function createTeachers()
    {
        $this->teacherUser1 = User::create([
            'name' => $this->faker->name,
            'email' => 'teacher1@' . $this->school1->domain_name,
            'password' => bcrypt('teacherpassword'),
            'role' => 'teacher',
            'confirmed' => true
        ]);

        $this->teacherUser2 = User::create([
            'name' => $this->faker->name,
            'email' => 'teacher2@' . $this->school2->domain_name,
            'password' => bcrypt('teacherpassword'),
            'role' => 'teacher',
            'confirmed' => true
        ]);

        $this->teacher1 = Teacher::create([
            'user_id' => $this->teacherUser1->id,
            'school_id' => $this->school1->id
        ]);

        $this->teacher2 = Teacher::create([
            'user_id' => $this->teacherUser2->id,
            'school_id' => $this->school2->id
        ]);
    }

    private function createAdmins()
    {
        $this->adminUser1 = User::create([
            'name' => $this->faker->name,
            'email' => 'admin1@' . $this->school1->domain_name,
            'password' => bcrypt('adminpassword'),
            'role' => 'admin',
            'confirmed' => true
        ]);

        $this->adminUser2 = User::create([
            'name' => $this->faker->name,
            'email' => 'admin2@' . $this->school2->domain_name,
            'password' => bcrypt('adminpassword'),
            'role' => 'admin',
            'confirmed' => true
        ]);

        $this->admin1 = SchoolAdmin::create([
            'user_id' => $this->adminUser1->id,
            'school_id' => $this->school1->id
        ]);

        $this->admin2 = SchoolAdmin::create([
            'user_id' => $this->adminUser2->id,
            'school_id' => $this->school2->id
        ]);
    }

    private function createStudents()
    {
        $this->studentUser1 = User::create([
            'name' => $this->faker->name,
            'email' => 'student1@' . $this->school1->domain_name,
            'password' => bcrypt('studentpassword'),
            'role' => 'student',
            'school_id' => $this->school1->id,
            'confirmed' => true
        ]);

        $i = 2;

        while ($i < 20) {
            User::create([
                'name' => $this->faker->name,
                'email' => 'student'. $i .'@' . $this->school1->domain_name,
                'password' => bcrypt('studentpassword'),
                'role' => 'student',
                'school_id' => $this->school1->id,
                'confirmed' => true
            ]);

            $i++;
        }
    }

    private function createSignupTokens()
    {
        SignupToken::create([
            'token' => str_random(10),
            'school_id' => $this->school1->id,
            'type' => 'student'
        ]);

        SignupToken::create([
            'token' => str_random(10),
            'school_id' => $this->school1->id,
            'type' => 'admin'
        ]);

        SignupToken::create([
            'token' => str_random(10),
            'school_id' => $this->school2->id,
            'type' => 'student'
        ]);

        SignupToken::create([
            'token' => str_random(10),
            'school_id' => $this->school2->id,
            'type' => 'admin'
        ]);
    }
}
