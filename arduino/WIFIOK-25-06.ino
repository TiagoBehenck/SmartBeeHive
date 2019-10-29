// Inclui a biblioteca do módulo wifi  
#include <ESP8266.h> 

// Inclui a biblioteca para comunicação do módulo WIFI com o arduino
#include <SoftwareSerial.h>

//Inclui a biblioteca do sensor de temperatura 
#include <dht.h> 

// Cria um objeto da classe dht
dht DHT;

// Setando os pinos que esta ligado o shield wifi
SoftwareSerial mySerial(52, 53);

int pino_analogico = A6;
int pino_digital = 7;


// Setando o sensor de som, microfone 
int valor_A0 = 0;
int valor_D = 0;

// Inicialização do módulo WIFI 
ESP8266 wifi(mySerial);

// Configuração dos dados do server
String server = "spacious-mistrial.000webhostapp.com";
String uri    = "/conexao.php";
String data = "colmeia=1&sensor=1&valor=1";
int    porta  = 80;

// SSID do WIFI e SENHA 
String nome_wifi  = "";
String senha_wifi = "";

void setup()
{
  // Inicializa serial com taxa de transmissão de 9600 bauds
  Serial.begin(9600);

  pinMode(pino_analogico, INPUT);
  pinMode(pino_digital, INPUT);
  
  mySerial.begin(115200);
  mySerial.print("AT+UART_CUR=9600,8,1,0,0\r\n");
  delay(1000);
  mySerial.end();

  ESP8266 wifi(mySerial);


if (wifi.setOprToStationSoftAP()) {
        Serial.print("to station + softap ok\r\n");
    } else {
        Serial.print("to station + softap err\r\n");
    }

  // Estabelece conexao com o Wi-fi
  if (wifi.joinAP(nome_wifi,senha_wifi)) {
      Serial.print("Conectado com sucesso\r\n");
      Serial.print("IP: ");
      Serial.println(wifi.getLocalIP().c_str());
      Serial.println("\n");
  } else {
      Serial.println("Falha na Conexao Wifi\r\n");
      // delay(3000);
      reconecta();      
  }

 if (wifi.disableMUX()) {
        Serial.print("single ok\r\n");
    } else {
        Serial.print("single err\r\n");
    }
  
}

void loop()
{
    // Chama método de leitura da classe dht, com o pino de transmissão de dados ligado no pino A1
    DHT.read22(A1); 

    valor_A0 = analogRead(pino_analogico);
    valor_D = digitalRead(pino_digital);


    // Transforma a variavel de string para float assim pode mandar para o bando de dados
    String temperaturastring = "";
    String somstring = "";
    String pesostring = "321";
    String umidadestring = "";
    String data = "";
    String sensor = "";

    // Exibe na serial o valor da temperatura
    float temperatura = DHT.temperature;
    
    temperaturastring = String(temperatura);

    // Insere em uma variavel o valor da umidade
    float umidade = DHT.humidity;

    // Transforma a variavel de string para float assim pode mandar para o bando de dados
    umidadestring = String(umidade);


    /* AQUI LER SOM E PESO E ALIMENTAR AS VARIAVEIS pesostring e somstring*/

    data = "dados={\"tipo\":\"15\",\"leitura\":[";

    if (temperaturastring != "NAN"){
      sensor = "{\"fk_id_sensor\":\"1\",\"valor_sensor\":\"" + temperaturastring + "\"}";
    }

    if (umidadestring != "NAN"){
      if (sensor != "")
        sensor = sensor + ",";
    
      sensor = sensor + "{\"fk_id_sensor\":\"2\",\"valor_sensor\":\"" + umidadestring + "\"}";
    }

    if (somstring != "NAN"){
      if (sensor != "")
        sensor = sensor + ",";
    
      sensor = sensor + "{\"fk_id_sensor\":\"3\",\"valor_sensor\":\"" + valor_A0 + "\"}";
    }

    if (pesostring != "NAN"){
      if (sensor != "")
        sensor = sensor + ",";
    
      sensor = sensor + "{\"fk_id_sensor\":\"4\",\"valor_sensor\":\"" + pesostring + "\"}";
    }

    sensor = sensor + "]}";
    data   = data + sensor;

    // Cria conexao
    wifi.createTCP(server, porta);

    // Serial.println(">>>" + data);

    envia(data); 

    delay(10000);
}
  
void envia(String dados){

  uint8_t buffer[1024] = {0};
  
  // Monta URL de conexao
  String postreq = "POST " + uri +"?"+ dados + " HTTP/1.0\r\n" +  
                   "Host: " + server + "\r\n" +  
                   "Accept: *" + "/" + "*\r\n" +  
                   "Content-Length: " + dados.length() + "\r\n" +  
                   "Content-Type: application/x-www-form-urlencoded\r\n" +  
                   "\r\n" + dados + "\r\n"; 

  Serial.println(postreq);
  
  char *hello = postreq.c_str();  
  wifi.send((const uint8_t*)hello, strlen(hello));
  uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
  if (len > 0) {
    String aux = "";
    
    for(uint32_t i = 0; i < len; i++) {
      aux += (char)buffer[i];
    }

    int firstClosingBracket = aux.indexOf('{');
    String resposta = aux.substring(firstClosingBracket,aux.length());
    resposta.trim();

    Serial.println(resposta);

  }else{
    Serial.println("erro");
  }

  if (wifi.releaseTCP()) {
        Serial.print("release tcp ok\r\n");
    } else {
        Serial.print("release tcp err! \r\n");
    }

  
}

void reconecta(){
  
  // Estabelece conexao com o Wi-fi
  if (wifi.joinAP(nome_wifi,senha_wifi)) {
      Serial.print("Conectado com sucesso\r\n");
      Serial.print("IP: ");
      Serial.println(wifi.getLocalIP().c_str());
      Serial.println("\n");
  } else {
      Serial.println("Falha na Conexao Wifi\r\n");
      delay(30000);      
      reconecta();      
  }  
}  