import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async saveContacts(contacts) {
    return await this.databaseService.contacts.create({
      data: contacts,
    });
  }
}
