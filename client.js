var PROTO_PATH = __dirname + "/chatbot.proto";
var protoLoader = require("@grpc/proto-loader");
var grpc = require('@grpc/grpc-js');
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
var chat_proto = grpc.loadPackageDefinition(packageDefinition).chatPack;

function main() {
    var client = new chat_proto.ChatService('0.0.0.0:8099', grpc.credentials.createInsecure());
    client.ChatFunc({ name: 'you' }, function (err, response) {
        console.log('Greeting:', response.result);
    });
}
main();
