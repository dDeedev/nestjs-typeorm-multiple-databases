import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from 'src/models/first_db/user.entity';

export class UserData1643336874970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.username = 'supserUser';
    user.password = 'adminmotherfucker';
    user.role = 'admin';
    await getRepository(User).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
