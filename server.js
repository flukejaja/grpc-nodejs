var PROTO_PATH = __dirname + "/chatbot.proto";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
var chat_proto = grpc.loadPackageDefinition(packageDefinition).chatPack;
function ChatFunc(call, callback) {
    callback(null, { result: "Hello " + call.request.name });
}
function main() {
    var server = new grpc.Server();
    server.addService(chat_proto.ChatService.service, { ChatFunc: ChatFunc });
    server.bindAsync(
        "0.0.0.0:8099",
        grpc.ServerCredentials.createInsecure(), () => {
            console.log("gRPC server started on port 8099");
            server.start();
        });
}
main();