<?PHP
    header("Access-Control-Allow-Origin: *");
    date_default_timezone_set('America/Sao_Paulo');

    if ((!isset($_POST["dados"])) and (!isset($_GET["dados"]))) {
        echo '{"verro":"true","vretorno":"PARAMETRO DE DADOS NAO ENCONTRADO"}';
        return;
    }

    /*== VERIFICA TIPO DE COMUNICAÇÃO É GET OU POST ==*/
    if (isset($_GET["dados"])){
        fcontrole($_GET["dados"]);
    } else if (isset($_POST["dados"])){
        fcontrole($_POST["dados"]);
    } else {
        echo '{"verro":"true","vretorno":"ERRO AO OBTER DADOS (GET/POST)"}';
        return;
    }

    /*== VERIFICA TIPO E CHAMA FUNÇÃO CORRESPONDENTE ==*/
    function fcontrole($dados) {

        if (empty($dados)) {
            echo '{"verro":"true","vretorno":"JSON DE DADOS NAO ENCONTRADO"}';
            return;
        }

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "tipo")) {
            echo '{"verro":"true","vretorno":"TIPO DE OPERACAO NAO ENCONTRADO"}';
            return;
        }

        $tipo = $jsonObj->tipo;

        switch ($tipo) {
            case "1":
                farduino($dados);
                break;
            case "2":
                fselect_ultcoleta($dados);
                break;
            case "3":
                fstatus_equipamento($dados);
                break;
            case "4":
                fselect_historico($dados);
                break;
            case "5":
                fselect_configuracoes($dados);
                break;
            case "6":
                fselect_setconfig($dados);
                break;
            case "7":
                fselect_log($dados);
                break;
            case "10":
                fapicultor($dados);
                break;
            case "11":
                fsel_apicultor($dados);
                break;
			case "12":
                fcolmeia($dados);
                break;
			case "13":
                fsel_colmeia($dados);
                break;
            case "14":
                fsel_ultver($dados);
                break;
            case "15":
                farduino_colmeia($dados);
                break;
            default:
                echo '{"verro":"true","vretorno":"TIPO INFORMADO INVALIDO"}';
                break;
        }
    }

    /*== GERENCIA CADASTRO APICULTOR ==*/
    function fapicultor($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "apicultor")) {
            echo '{"verro":"true","vretorno":"DADOS DO APICULTOR NAO ENCONTRADOS"}';
            return;
        }

        $connect = mysqli_connect("localhost", "id9265293_tiago", "1q2w3e4r5t", "id9265293_apicultura");

        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $apicultor = $jsonObj->apicultor;

        foreach ($apicultor as $e){

            if ((!property_exists($e,"nome"))){
                echo '{"verro":"true","vretorno":"NOME DO APICULTOR DEVE SER INFORMADO"}';
                return;
            }

            if ((!property_exists($e,"email"))){
                echo '{"verro":"true","vretorno":"E-MAIL DO APICULTOR DEVE SER INFORMADO"}';
                return;
            }
            
            $query  = 'select * from apicultor where email = "'.$e->email.'"';
            $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DOS APICULTORES"}');
            $count  = 0;

            while($retorno=mysqli_fetch_assoc($result)){
                $count++;
            }

            if ($count != 1) {
                $query = 'INSERT INTO apicultor (cidade, cpf, email, endereco, nome, telefone, uf) VALUES ("'.$e->cidade.'","'.$e->cpf.'","'.$e->email.'","'.$e->endereco.'","'.$e->nome.'","'.$e->telefone.'","'.$e->uf.'")';
                $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL INSERT APICULTOR"}');
            } else {
                $query = 'update apicultor set apicultor.cidade = "'.$e->cidade.'", apicultor.cpf = "'.$e->cpf.'", apicultor.endereco = "'.$e->endereco.'", apicultor.nome = "'.$e->nome.'", apicultor.telefone = "'.$e->telefone.'", apicultor.uf = "'.$e->uf.'" where apicultor.email = "'.$e->email.'"';
                $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE DO LIMITE DE UMIDADE"}');
            }
        }
		
		echo '{"verro":"false","vretorno":"SUCESSO"}';
    }

    /*== CONSULTA APICULTOR POR EMAIL ==*/
    function fsel_apicultor($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "email")) {
            echo '{"verro":"true","vretorno":"E-MAIL DO APICULTOR NAO INFORMADO"}';
            return;
        }

        $connect = mysqli_connect("localhost", "id9265293_tiago", "1q2w3e4r5t", "id9265293_apicultura");

        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $query  = 'select apicultor.id, apicultor.cidade, apicultor.cpf, apicultor.email, apicultor.endereco, apicultor.nome, apicultor.telefone, apicultor.uf from apicultor where apicultor.email = "'.$jsonObj->email.'"';
        $result   = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DO APICULTOR"}');
        $apicultor = "";

        while($retorno=mysqli_fetch_assoc($result)){
            
            if (!empty($apicultor))
                $apicultor = $apicultor.',';

            $apicultor = $apicultor.'{"id":"'.$retorno['id'].'","cidade":"'.$retorno['cidade'].
                        '","cpf":"'.$retorno['cpf'].'","email":"'.$retorno['email'].'","endereco":"'.$retorno['endereco'].
                        '","nome":"'.$retorno['nome'].'","telefone":"'.$retorno['telefone'].
                        '","uf":"'.$retorno['uf'].'"}';
        }

        if (empty($apicultor)) {
            echo '{"verro":"true","vretorno":"NENHUM APICULTOR ENCONTRADO PARA O E-EMAIL INFORMADO"}';
            return;
        }
		
		$apicultor = ',"apicultor":['.$apicultor.']';

        echo '{"verro":"false","vretorno":"SUCESSO"'.$apicultor.'}';
    }

	/*== GERENCIA CADASTRO DE COLMEIAS ==*/
    function fcolmeia($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "colmeia")) {
            echo '{"verro":"true","vretorno":"DADOS DE COLMEIAS NAO ENCONTRADOS"}';
            return;
        }

        $connect = mysqli_connect("localhost", "id9265293_tiago", "1q2w3e4r5t", "id9265293_apicultura");

        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $colmeia = $jsonObj->colmeia;

        foreach ($colmeia as $e){

            if ((!property_exists($e,"descricao"))){
                echo '{"verro":"true","vretorno":"DESCRIÇÃO DA COLMEIA NAO INFORMADO"}';
                return;
            }

            if ((!property_exists($e,"apicultor"))){
                echo '{"verro":"true","vretorno":"APICULTOR DEVE SER INFORMADO"}';
                return;
            }
            
            $query = 'INSERT INTO colmeias (fk_id_apicultor, descricao) VALUES ('.$e->apicultor.',"'.$e->descricao.'")';
			
			$result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL INSERT COLMEIA"}');
        }
		
		echo '{"verro":"false","vretorno":"SUCESSO"}';
    }

	/*== CONSULTA COLMEIAIS DO APICULTOR ==*/
    function fsel_colmeia($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "apicultor")) {
            echo '{"verro":"true","vretorno":"APICULTOR NAO INFORMADO"}';
            return;
        }

        $connect = mysqli_connect("localhost", "id9265293_tiago", "1q2w3e4r5t", "id9265293_apicultura");

        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $query = 'select colmeias.id, colmeias.fk_id_apicultor, colmeias.descricao, apicultor.nome from colmeias, apicultor where colmeias.fk_id_apicultor = '.$jsonObj->apicultor.
                 ' and apicultor.id = colmeias.fk_id_apicultor';

		$result   = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DAS COLMEIAS"}');
        $colmeias = "";

        while($retorno=mysqli_fetch_assoc($result)){
            
            if (!empty($colmeias))
                $colmeias = $colmeias.',';

            $colmeias = $colmeias.'{"id":"'.$retorno['id'].'","fk_id_apicultor":"'.$retorno['fk_id_apicultor'].
                        '","descricao":"'.$retorno['descricao'].'","nome":"'.$retorno['nome'].'"}';
        }

        if (empty($colmeias)) {
            echo '{"verro":"true","vretorno":"NENHUMA COLMEIA ENCONTRADA PARA O APICULTOR INFORMADO"}';
            return;
        }
		
		$colmeias = ',"colmeias":['.$colmeias.']';

        echo '{"verro":"false","vretorno":"SUCESSO"'.$colmeias.'}';
    }

    /*== VERIFICA OS ULTIMOS DADOS COLETADOS POR CADA SENSOR ==*/
    function fsel_ultver($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        $connect = mysqli_connect("localhost", "id9265293_tiago", "1q2w3e4r5t", "id9265293_apicultura");

        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $query  = 'select sensores.id, sensores.sensor, sensores.iconios, sensores.iconand, sensores.um, leitura.dataHora, leitura.valor_sensor from sensores '.
                  'inner join leitura ON leitura.fk_id_sensor = sensores.id and leitura.id = (select max(leitura.id) '.
                  'from leitura where leitura.fk_id_sensor = sensores.id)';

        $result   = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DAS LEITURAS"}');
        $sensores = "";

        while($retorno=mysqli_fetch_assoc($result)){
            
            if (!empty($sensores))
                $sensores = $sensores.',';

            $sensores = $sensores.'{"id":"'.$retorno['id'].'","sensor":"'.$retorno['sensor'].
                        '","iconios":"'.$retorno['iconios'].'","iconand":"'.$retorno['iconand'].
                        '","um":"'.$retorno['um'].
                        '","dataHora":"'.$retorno['dataHora'].'","valor_sensor":"'.$retorno['valor_sensor'].'"}';
        }

        $sensores = ',"leituras":['.$sensores.']';

        echo '{"verro":"false","vretorno":"SUCESSO"'.$sensores.'}';

        mysqli_close($connect);
    }

    /*== ARMAZENA DADOS ENVIADOS PELO ARDUINO E RETORNA SITUAÇÃO DE CADA SENSOR ==*/
    function farduino_colmeia($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);
        $leitura   = $jsonObj->leitura;

        $connect = mysqli_connect("localhost", "id9265293_tiago", "1q2w3e4r5t", "id9265293_apicultura");

        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        foreach ($leitura as $e ){

            if ((!property_exists($e,"fk_id_sensor")) or
                (!property_exists($e,"valor_sensor"))){

                echo '{"verro":"true","vretorno":"SENSOR / VALOR NAO ENCONTRADOS"}';
                return;
            }

            $sensor  = $e->fk_id_sensor;
            $valor   = $e->valor_sensor;

            $data  = date("Y-m-d H:i:s");
            $query = 'INSERT INTO leitura (dataHora, fk_id_colmeia, fk_id_sensor, valor_sensor) VALUES ("'.$data.'","1","'.$sensor.'","'.$valor.'")';
            
            $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERROX NO COMANDO SQL INSERT LEITURA"}');
        }     

        echo '{"verro":"false","vretorno":"SUCESSO"}';

        mysqli_close($connect);
    }














    /*== ARMAZENA DADOS ENVIADOS PELO ARDUINO E RETORNA SITUAÇÃO DE CADA SENSOR ==*/
    function farduino($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "coleta")) {
            echo '{"verro":"true","vretorno":"DADOS DE COLETA NAO ENCONTRADO"}';
            return;
        }

        if (!property_exists($jsonObj, "conexao")) {
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO NAO ENCONTRADO"}';
            return;
        }

        $coleta = $jsonObj->coleta;
        $conexao = $jsonObj->conexao;

        $valor_temperatura = "";
        $banco = "";
        $senha_enconde = "";
        $senha = "";
        $user = "";

        /*== VERIFICA DADOS DE CONEXÃO ENVIADO NO JSON ==*/
        foreach ($conexao as $e){

            if ((!property_exists($e,"banco")) or
                (!property_exists($e,"user"))  or
                (!property_exists($e,"senha"))){

                echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO ENCONTRADOS"}';
                return;
            }

            $banco = $e->banco;
            $senha_enconde = $e->senha;
            $senha = base64_decode($senha_enconde);
            $user = $e->user;
        }

        if (empty($banco) or
            empty($user)  or
            empty($senha)) {
            
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO INFORMADOS"}';
            return;
        }

        /*== VALIDA CONEXÃO COM OS DADOS OBTIDOS DO JSON ==*/
        $connect = mysqli_connect("localhost", $user, $senha, $banco);
        
        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        /*== VALIDA COLETA DE DADOS DOS SENSORES ==*/
        foreach ($coleta as $e ){

            if ((!property_exists($e,"sigla")) or
                (!property_exists($e,"valor"))){

                echo '{"verro":"true","vretorno":"SIGLA E VALOR DO SENSOR DA COLETA NAO ENCONTRADOS"}';
                return;
            }

            $sigla = $e->sigla;
            $valor = $e->valor;

            if ($sigla == "DHTEMP")
                $valor_temperatura = $valor;

            if (empty($sigla) or
                empty($valor)){

                echo '{"verro":"true","vretorno":"SIGLA E VALOR DO SENSOR DA COLETA NAO INFORMADOS"}';
                return;
            }

            $query     = 'select * from sensor where sigla = "'.$sigla.'"';
            $result    = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DOS SENSORES"}');
            $count     = 0;
            $id_sensor = "";

            while($retorno=mysqli_fetch_assoc($result)){
                $id_sensor = $retorno['id_sensor'];
                $count++;
            }

            if ($count != 1) {
                echo '{"verro":"true","vretorno":"SENSOR NAO ENCONTRADO '.$sigla.'"}';
                return;
            }

            if (empty($id_sensor)){
                echo '{"verro":"true","vretorno":"SENSOR NAO ENCONTRADO '.$sigla.'"}';
                return;
            }

            $data  = date("Y-m-d");
            $hora  = date('H:i:s');
            $query = 'INSERT INTO coleta (id_sensor, valor, data, hora) VALUES ('.$id_sensor.',"'.$valor.'","'.$data.'","'.$hora.'")';

            $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL INSERT COLETA"}');
        }        

        /*== VERIFICA SE DEVE REALiZAR AUTOMATIZACAO OU CONTROLE MANUAL ==*/
        $query  = 'select configuracoes.valor from configuracoes where configuracoes.sigla = "AUTO"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DAS CONFIGURACOES"}');

        $automatizacao = "";
        while($retorno=mysqli_fetch_assoc($result)){
            $automatizacao = $retorno['valor'];
        }

        if ($automatizacao == "true"){
    
            $query  = 'select sensor.linicial, sensor.lfinal from sensor where sensor.sigla = "DHTEMP"';
            $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DOS SENSORES"}');
            
            while($retorno=mysqli_fetch_assoc($result)){
                
                /*== Temperatura baixa, ligar lampada ==*/
                if ($valor_temperatura < $retorno['linicial']){
                    $query  = 'update equipamento set equipamento.status = 1 where equipamento.sigla = "LUZ"';
                    $aux = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE EQUIPAMENTOS"}');

                    $query  = 'update equipamento set equipamento.status = 0 where equipamento.sigla = "VEN"';
                    $aux = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE EQUIPAMENTOS"}');
                } 
                /*== Temperatura alta, ligar ventilador ==*/
                else if ($valor_temperatura > $retorno['lfinal']){
                    $query  = 'update equipamento set equipamento.status = 1 where equipamento.sigla = "VEN"';
                    $aux = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE EQUIPAMENTOS"}');

                    $query  = 'update equipamento set equipamento.status = 0 where equipamento.sigla = "LUZ"';
                    $aux = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE EQUIPAMENTOS"}');
                }
                /*== temperatura ideal, desligar ambos ==*/
                else {
                    $query  = 'update equipamento set equipamento.status = 0 where equipamento.sigla = "VEN"';
                    $aux = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE EQUIPAMENTOS"}');

                    $query  = 'update equipamento set equipamento.status = 0 where equipamento.sigla = "LUZ"';
                    $aux = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE EQUIPAMENTOS"}');
                }
            }
        }

        $query  = 'select * from equipamento';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DOS EQUIPAMENTOS"}');

        $equip  = "";
        while($retorno=mysqli_fetch_assoc($result)){
            $equip = $equip.',"'.$retorno['sigla'].'":"'.$retorno['status'].'"';
        }

        $query  = 'select configuracoes.valor from configuracoes where configuracoes.sigla = "TVERIF"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DAS CONFIGURACOES"}');

        $config = "";
        while($retorno=mysqli_fetch_assoc($result)){
            $config = ',"TEMPO":"'.$retorno['valor'].'"';
        }

        echo '{"verro":"false","vretorno":"SUCESSO"'.$equip.$config.'}';

        mysqli_close($connect);
    }

    /*== VERIFICA OS ULTIMOS DADOS COLETADOS POR CADA SENSOR ==*/
    function fselect_ultcoleta($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "conexao")) {
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO NAO ENCONTRADO"}';
            return;
        }

        $conexao = $jsonObj->conexao;

        $banco = "";
        $senha_enconde = "";
        $senha = "";
        $user = "";

        /*== VERIFICA DADOS DE CONEXÃO ENVIADO NO JSON ==*/
        foreach ($conexao as $e){

            if ((!property_exists($e,"banco")) or
                (!property_exists($e,"user"))  or
                (!property_exists($e,"senha"))){

                echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO ENCONTRADOS"}';
                return;
            }

            $banco = $e->banco;
            $senha_enconde = $e->senha;
            $senha = base64_decode($senha_enconde);
            $user = $e->user;
        }

        if (empty($banco) or
            empty($user)  or
            empty($senha)) {
            
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO INFORMADOS"}';
            return;
        }

        /*== VALIDA CONEXÃO COM OS DADOS OBTIDOS DO JSON ==*/
        $connect = mysqli_connect("localhost", $user, $senha, $banco);
        
        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $query  = 'select sensor.id_sensor, sensor.sigla, sensor.descricao, sensor.icone, sensor.unidade, sensor.linicial, sensor.lfinal, coleta.valor, coleta.data, coleta.hora from sensor '.
                  'inner join coleta ON coleta.id_sensor = sensor.id_sensor and coleta.id_coleta = (select max(coleta.id_coleta) '.
                  'from coleta where coleta.id_sensor = sensor.id_sensor)';

        $result   = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DO COLETA"}');
        $sensores = "";

        while($retorno=mysqli_fetch_assoc($result)){
            
            if (!empty($sensores))
                $sensores = $sensores.',';

            $sensores = $sensores.'{"id_sensor":"'.$retorno['id_sensor'].'","sigla":"'.$retorno['sigla'].
                        '","icone":"'.$retorno['icone'].'","unidade":"'.$retorno['unidade'].'","descricao":"'.$retorno['descricao'].
                        '","linicial":"'.$retorno['linicial'].'","lfinal":"'.$retorno['lfinal'].
                        '","valor":"'.$retorno['valor'].'","data":"'.$retorno['data'].'","hora":"'.$retorno['hora'].'"}';
        }

        $sensores = ',"sensores":['.$sensores.']';

        $equip  = "";        
        $query  = 'select equipamento.sigla, equipamento.status from equipamento';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DOS EQUIPAMENTOS"}');

        while($retorno=mysqli_fetch_assoc($result)){
            
            $equip = $equip.',"'.$retorno['sigla'].'":"'.$retorno['status'].'"';
        }

        $query = 'select configuracoes.valor, configuracoes.sigla from configuracoes where configuracoes.sigla = "TVERIF" or configuracoes.sigla = "AUTO"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DE CONFIGURACAO"}');
        $config = "";

        while($retorno=mysqli_fetch_assoc($result)){

            $config = $config.',';

            if ($retorno['sigla'] == "AUTO")
                $config = $config.'"auto":"'.$retorno['valor'].'"';
            else 
                $config = $config.'"tempo":"'.$retorno['valor'].'"';
        }

        echo '{"verro":"false","vretorno":"SUCESSO","dtatu":"'.date("Y-m-d").'","hratu":"'.date('H:i:s').'"'.$config.$equip.$sensores.'}';

        mysqli_close($connect);
    }

    /*== MUDA STATUS DO EQUIPAMENTO DE ACORDO COM O QUE FOI SOLICITADO PELO APP ==*/
    function fstatus_equipamento($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "conexao")) {
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO NAO ENCONTRADO"}';
            return;
        }

        if (!property_exists($jsonObj, "sigla")) {
            echo '{"verro":"true","vretorno":"SIGLA DO EQUIPAMENTO NAO INFORMADA"}';
            return;
        }

        if (!property_exists($jsonObj, "status")) {
            echo '{"verro":"true","vretorno":"STATUS DO EQUIPAMENTO NAO INFORMADO"}';
            return;
        }

        $conexao = $jsonObj->conexao;
        $banco = "";
        $senha_enconde = "";
        $senha = "";
        $user = "";
        $sigla = $jsonObj->sigla;
        $status = $jsonObj->status;
        $id_equip = "";

        /*== VERIFICA DADOS DE CONEXÃO ENVIADO NO JSON ==*/
        foreach ($conexao as $e){

            if ((!property_exists($e,"banco")) or
                (!property_exists($e,"user"))  or
                (!property_exists($e,"senha"))){

                echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO ENCONTRADOS"}';
                return;
            }

            $banco = $e->banco;
            $senha_enconde = $e->senha;
            $senha = base64_decode($senha_enconde);
            $user = $e->user;
        }

        if (empty($banco) or
            empty($user)  or
            empty($senha)) {
            
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO INFORMADOS"}';
            return;
        }

        /*== VALIDA CONEXÃO COM OS DADOS OBTIDOS DO JSON ==*/
        $connect = mysqli_connect("localhost", $user, $senha, $banco);
        
        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $query  = 'update equipamento set equipamento.status = '.$status.' where equipamento.sigla = "'.$sigla.'"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE EQUIPAMENTOS"}');

        $data   = date("Y-m-d");
        $hora   = date('H:i:s');

        if (property_exists($jsonObj, "log")) {

            $query = 'select id_equip from equipamento where equipamento.sigla = "'.$sigla.'"';
            $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DO ID DO EQUIPAMENTO"}');

            while($retorno=mysqli_fetch_assoc($result)){

                $id_equip = $retorno['id_equip'];
            }

            $query = 'INSERT INTO log (valor, data, hora, id_equip) VALUES ("'.$jsonObj->log.'","'.$data.'","'.$hora.'",'.$id_equip.')';
            $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL INSERT LOGS"}');
        }

        echo '{"verro":"false","vretorno":"SUCESSO"}';

        mysqli_close($connect);
    }

    /*== RETORNA HISTORICO DE COLETA DO SENSOR NO PERIODO ==*/
    function fselect_historico($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "conexao")) {
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO NAO ENCONTRADO"}';
            return;
        }

        if (!property_exists($jsonObj, "id_sensor")) {
            echo '{"verro":"true","vretorno":"SENSOR NAO INFORMADO"}';
            return;
        }

        if (!property_exists($jsonObj, "dtini")) {
            echo '{"verro":"true","vretorno":"DADA INICIAL NAO INFORMADA"}';
            return;
        }

        if (!property_exists($jsonObj, "dtfim")) {
            echo '{"verro":"true","vretorno":"DADA FINAL NAO INFORMADA"}';
            return;
        }

        $id_sensor = $jsonObj->id_sensor;
        $dtini = $jsonObj->dtini;
        $dtfim = $jsonObj->dtfim;
        $conexao = $jsonObj->conexao;

        $banco = "";
        $senha_enconde = "";
        $senha = "";
        $user = "";

        /*== VERIFICA DADOS DE CONEXÃO ENVIADO NO JSON ==*/
        foreach ($conexao as $e){

            if ((!property_exists($e,"banco")) or
                (!property_exists($e,"user"))  or
                (!property_exists($e,"senha"))){

                echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO ENCONTRADOS"}';
                return;
            }

            $banco = $e->banco;
            $senha_enconde = $e->senha;
            $senha = base64_decode($senha_enconde);
            $user = $e->user;
        }

        if (empty($banco) or
            empty($user)  or
            empty($senha)) {
            
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO INFORMADOS"}';
            return;
        }

        /*== VALIDA CONEXÃO COM OS DADOS OBTIDOS DO JSON ==*/
        $connect = mysqli_connect("localhost", $user, $senha, $banco);
        
        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $query  = 'select coleta.valor, coleta.data, coleta.hora, sensor.unidade from coleta '.
                  'inner join sensor ON sensor.id_sensor = coleta.id_sensor '.
                  'where coleta.id_sensor = '.$id_sensor.' and coleta.data between CAST("'.$dtini.'" AS DATE) and CAST("'.$dtfim.'" AS DATE)'.
                  ' order by coleta.id_coleta desc';

        $result    = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DO HISTORICO DA COLETA"}');
        $historico = "";

        while($retorno=mysqli_fetch_assoc($result)){
            
            if (!empty($historico))
                $historico = $historico.',';

            $historico = $historico.'{"valor":"'.$retorno['valor'].'","data":"'.$retorno['data'].'"'.
                                    ',"hora":"'.$retorno['hora'].'","unidade":"'.$retorno['unidade'].'"}';
        }

        $historico = ',"historico":['.$historico.']';

        echo '{"verro":"false","vretorno":"SUCESSO"'.$historico.'}';

        mysqli_close($connect);
    }

    /*== RETORNA CONFIGURACOES ==*/
    function fselect_configuracoes($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "conexao")) {
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO NAO ENCONTRADO"}';
            return;
        }

        $conexao = $jsonObj->conexao;

        $banco = "";
        $senha_enconde = "";
        $senha = "";
        $user = "";

        /*== VERIFICA DADOS DE CONEXÃO ENVIADO NO JSON ==*/
        foreach ($conexao as $e){

            if ((!property_exists($e,"banco")) or
                (!property_exists($e,"user"))  or
                (!property_exists($e,"senha"))){

                echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO ENCONTRADOS"}';
                return;
            }

            $banco = $e->banco;
            $senha_enconde = $e->senha;
            $senha = base64_decode($senha_enconde);
            $user = $e->user;
        }

        if (empty($banco) or
            empty($user)  or
            empty($senha)) {
            
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO INFORMADOS"}';
            return;
        }

        /*== VALIDA CONEXÃO COM OS DADOS OBTIDOS DO JSON ==*/
        $connect = mysqli_connect("localhost", $user, $senha, $banco);
        
        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $query  = 'select configuracoes.sigla, configuracoes.valor from configuracoes where configuracoes.sigla = "TVERIF" or configuracoes.sigla = "AUTO"';

        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DE CONFIGURACAO"}');
        $config = "";

        while($retorno=mysqli_fetch_assoc($result)){
            
            if (!empty($config))
                $config = $config.',';

            if ($retorno['sigla'] == "AUTO")
                $config = $config.'"auto":"'.$retorno['valor'].'"';
            else 
                $config = $config.'"tempo":"'.$retorno['valor'].'"';
        }

        $query  = 'select sensor.sigla, sensor.linicial, sensor.lfinal from sensor';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DE CONFIGURACAO DOS SENSORES"}');

        while($retorno=mysqli_fetch_assoc($result)){
            
            if (!empty($config))
                $config = $config.',';

            if ($retorno['sigla'] == "DHTEMP")
                $config = $config.'"litemperatura":"'.$retorno['linicial'].'","lftemperatura":"'.$retorno['lfinal'].'"';
            else if ($retorno['sigla'] == "DHTUMI") 
                $config = $config.'"liumidade":"'.$retorno['linicial'].'","lfumidade":"'.$retorno['lfinal'].'"';
            else if ($retorno['sigla'] == "LDR")
                $config = $config.'"liluz":"'.$retorno['linicial'].'","lfluz":"'.$retorno['lfinal'].'"';
            else
                $config = $config.'"lisom":"'.$retorno['linicial'].'","lfsom":"'.$retorno['lfinal'].'"';
        }

        echo '{"verro":"false","vretorno":"SUCESSO",'.$config.'}';

        mysqli_close($connect);
    }

    /*== ALTERA CONFIGURAÇÕES ==*/
    function fselect_setconfig($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "conexao")) {
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO NAO ENCONTRADO"}';
            return;
        }

        if (!property_exists($jsonObj, "tempo")) {

            echo '{"verro":"true","vretorno":"TEMPOS DE VERIFICACAO NAO INFORMADOS"}';
            return;
        }

        $conexao = $jsonObj->conexao;
        $banco = "";
        $senha_enconde = "";
        $senha = "";
        $user = "";
        $id = "";

        /*== VERIFICA DADOS DE CONEXÃO ENVIADO NO JSON ==*/
        foreach ($conexao as $e){

            if ((!property_exists($e,"banco")) or
                (!property_exists($e,"user"))  or
                (!property_exists($e,"senha"))){

                echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO ENCONTRADOS"}';
                return;
            }

            $banco = $e->banco;
            $senha_enconde = $e->senha;
            $senha = base64_decode($senha_enconde);
            $user = $e->user;
        }

        if (empty($banco) or
            empty($user)  or
            empty($senha)) {
            
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO INFORMADOS"}';
            return;
        }

        /*== VALIDA CONEXÃO COM OS DADOS OBTIDOS DO JSON ==*/
        $connect = mysqli_connect("localhost", $user, $senha, $banco);
        
        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        /*== TEMPO DE VERIFICACAO ==*/
        $query = 'update configuracoes set configuracoes.valor = "'.$jsonObj->tempo.'" where configuracoes.sigla = "TVERIF"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE DAS CONFIGURACOES"}');

        /*== AUTOMATIZACAO ==*/
        $query = 'update configuracoes set configuracoes.valor = "'.$jsonObj->auto.'" where configuracoes.sigla = "AUTO"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE DAS CONFIGURACOES"}');

        /*== LIMITES DE BEM-ESTAR ==*/
        $query = 'update sensor set sensor.linicial = '.$jsonObj->litemperatura.', sensor.lfinal = '.$jsonObj->lftemperatura.' where sensor.sigla = "DHTEMP"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE DO LIMITE DE TEMPERATURA"}');

        $query = 'update sensor set sensor.linicial = '.$jsonObj->liumidade.', sensor.lfinal = '.$jsonObj->lfumidade.' where sensor.sigla = "DHTUMI"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE DO LIMITE DE UMIDADE"}');

        $query = 'update sensor set sensor.linicial = '.$jsonObj->liluz.', sensor.lfinal = '.$jsonObj->lfluz.' where sensor.sigla = "LDR"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE DO LIMITE DE LUZ"}');

        $query = 'update sensor set sensor.linicial = '.$jsonObj->lisom.', sensor.lfinal = '.$jsonObj->lfsom.' where sensor.sigla = "KY038"';
        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL UPDATE DO LIMITE DE SOM"}');

        /*== Grava Log ==*/
        if (property_exists($jsonObj, "log")) {
            
            $log = $jsonObj->log;

            foreach ($log as $e){

                if ((property_exists($e,"valor")) and
                    (property_exists($e,"tipo"))){
                    
                    $data   = date("Y-m-d");
                    $hora   = date('H:i:s');

                    if ($e->tipo == "1"){
                        
                        $query = 'select id_config from configuracoes where configuracoes.sigla = "'.$e->sigla.'"';
                        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DO ID DAS CONFIGURACOES"}');

                        while($retorno=mysqli_fetch_assoc($result)){
                            $id = $retorno['id_config'];
                        }

                        $query = 'INSERT INTO log (valor, data, hora, id_config) VALUES ("'.$e->valor.'","'.$data.'","'.$hora.'",'.$id.')';
                    } else {

                        $query = 'select id_sensor from sensor where sensor.sigla = "'.$e->sigla.'"';
                        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DO ID DO SENSOR"}');

                        while($retorno=mysqli_fetch_assoc($result)){
                            $id = $retorno['id_sensor'];
                        }

                        $query = 'INSERT INTO log (valor, data, hora, id_sensor) VALUES ("'.$e->valor.'","'.$data.'","'.$hora.'",'.$id.')';
                    }
                   
                    $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL INSERT LOGS"}');
                }
            }
        }

        echo '{"verro":"false","vretorno":"SUCESSO"}';
        mysqli_close($connect);
    }

    /*== RETORNA HISTORICO DE LOGS NO PERIODO ==*/
    function fselect_log($dados){

        $json_str = $dados;
        $jsonObj  = json_decode($json_str);

        if (!property_exists($jsonObj, "conexao")) {
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO NAO ENCONTRADO"}';
            return;
        }

        if (!property_exists($jsonObj, "dtini")) {
            echo '{"verro":"true","vretorno":"DADA INICIAL NAO INFORMADA"}';
            return;
        }

        if (!property_exists($jsonObj, "dtfim")) {
            echo '{"verro":"true","vretorno":"DADA FINAL NAO INFORMADA"}';
            return;
        }

        $dtini = $jsonObj->dtini;
        $dtfim = $jsonObj->dtfim;
        $conexao = $jsonObj->conexao;

        $banco = "";
        $senha_enconde = "";
        $senha = "";
        $user = "";

        /*== VERIFICA DADOS DE CONEXÃO ENVIADO NO JSON ==*/
        foreach ($conexao as $e){

            if ((!property_exists($e,"banco")) or
                (!property_exists($e,"user"))  or
                (!property_exists($e,"senha"))){

                echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO ENCONTRADOS"}';
                return;
            }

            $banco = $e->banco;
            $senha_enconde = $e->senha;
            $senha = base64_decode($senha_enconde);
            $user = $e->user;
        }

        if (empty($banco) or
            empty($user)  or
            empty($senha)) {
            
            echo '{"verro":"true","vretorno":"DADOS DE CONEXAO BANCO / USER / SENHA NAO INFORMADOS"}';
            return;
        }

        /*== VALIDA CONEXÃO COM OS DADOS OBTIDOS DO JSON ==*/
        $connect = mysqli_connect("localhost", $user, $senha, $banco);
        
        if ($connect->connect_error) {
            echo '{"verro":"true","vretorno":"PROBLEMA DE CONEXAO - '.$connect->connect_error.'"}';
            return;
        }

        $query  = 'select log.valor, log.data, log.hora from log '.
                  'where log.data between CAST("'.$dtini.'" AS DATE) and CAST("'.$dtfim.'" AS DATE)'.
                  ' order by log.id_log desc';

        $result = mysqli_query($connect,$query) or die('{"verro":"true","vretorno":"ERRO NO COMANDO SQL DO HISTORICO DE LOGS"}');
        $log    = "";

        while($retorno=mysqli_fetch_assoc($result)){

            if (!empty($log))
                $log = $log.',';

            $log = $log.'{"valor":"'.$retorno['valor'].'","data":"'.$retorno['data'].'"'.
                        ',"hora":"'.$retorno['hora'].'"}';
        }

        $log = ',"log":['.$log.']';

        echo '{"verro":"false","vretorno":"SUCESSO"'.$log.'}';

        mysqli_close($connect);
    }
?>