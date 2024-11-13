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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  async handleConnection(client: Socket) {
    console.log('Client connected', client.id);
    // client.emit('message', 'hello');
    return;
  }
  async handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
    return;
  }
  @SubscribeMessage('createMessage')
  create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = this.messageService.create(createMessageDto, client.id);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }

  //join channel
  @SubscribeMessage('join')
  joinChannel(
    @MessageBody('name') name: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const allusers = this.messageService.join(name, socket.id);
    socket.broadcast.emit('join', allusers);
    return allusers;
  }

  //leave channel
  @SubscribeMessage('leave')
  leaveChannel(
    @MessageBody('name') name: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const allusers = this.messageService.leave(name, socket.id);
    socket.broadcast.emit('leave', allusers);
    return allusers;
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('typing') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const userName = await this.messageService.getUserName(client.id);
    client.broadcast.emit('typing', { userName, isTyping });
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id);
  }
}
