import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  messages: Message[] = [{ name: 'ktk', text: 'hello' }];

  private userlist = new Map<string, string>();

  getUserName(clientId: string) {
    return this.userlist.get(clientId);
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
    this.userlist.set(clientId, name);
    return Array.from(this.userlist.values());
  }

  leave(clientId: string) {
    this.userlist.delete(clientId);
    return Array.from(this.userlist.values());
  }

  async typing(isTyping: boolean, clientId: string) {
    return;
  }

  
}
