import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
@WebSocketGateway({ cors: { origin: '*' } })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private messageService: MessageService) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const name = this.messageService.getUserName(client.id);
    const users = this.messageService.leave(client.id);
    this.server.emit('leave', users);
    console.log(`${name} disconnected`);
  }

  @SubscribeMessage('join')
  join(@MessageBody('name') name: string, @ConnectedSocket() client: Socket) {
    const users = this.messageService.join(name, client.id);
    this.server.emit('join', users);
  }
  @SubscribeMessage('leave')
  leave(@ConnectedSocket() client: Socket) {
    const users = this.messageService.leave(client.id);
    console.log('🚀 ~ leave ~ users:', users);
    this.server.emit('leave', users);
  }
  //emote heart
  @SubscribeMessage('makeEmote')
  emote(@MessageBody('text') text: string, @ConnectedSocket() client: Socket) {
    const userName = this.messageService.getUserName(client.id);
    this.server.emit('emote', { userName });
  }

  @SubscribeMessage('createMessage')
  createMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = {
      name: createMessageDto.name,
      text: createMessageDto.text,
    };
    this.server.emit('message', message);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const userName = this.messageService.getUserName(client.id);
    client.broadcast.emit('typing', { userName, isTyping });
  }
}
