#!/bin/bash

# Script para executar Spring Boot com debug habilitado
# Salve este arquivo como spring-debug.sh e execute: chmod +x spring-debug.sh

PORT=${1:-5005}
SUSPEND=${2:-n}

echo "🔧 Iniciando aplicação Spring Boot com debug..."
echo "📍 Porta de debug: $PORT"
echo "⏸️  Suspend: $SUSPEND"
echo ""

# Verifica se existe pom.xml (Maven) ou build.gradle (Gradle)
if [ -f "pom.xml" ]; then
    echo "📦 Projeto Maven detectado"
    echo "🚀 Executando: mvn spring-boot:run com debug..."
    mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=$SUSPEND,address=$PORT"
elif [ -f "build.gradle" ] || [ -f "build.gradle.kts" ]; then
    echo "📦 Projeto Gradle detectado"
    echo "🚀 Executando: ./gradlew bootRun com debug..."
    ./gradlew bootRun --debug-jvm
else
    echo "❌ Erro: Projeto Spring Boot não encontrado (sem pom.xml ou build.gradle)"
    echo "📁 Certifique-se de estar no diretório raiz do projeto"
    exit 1
fi
