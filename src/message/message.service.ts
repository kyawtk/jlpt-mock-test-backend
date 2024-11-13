import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  messages: Message[] = [{ name: 'ktk', text: 'hello' }];
  userlist = [];

  getUserName(clientId: string) {
    return this.userlist[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: this.userlist[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }

  join(name: string, clientId: string) {
    this.userlist[clientId] = name;
    return Object.values(this.userlist);
  }

  leave(name: string, clientId: string) {
    delete this.userlist[clientId];
    return Object.values(this.userlist);
  }

  //   async typing(isTyping: boolean, clientId: string) {
  //     return Object.values(this.userlist);
  //   }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
