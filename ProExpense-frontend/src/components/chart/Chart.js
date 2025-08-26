import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, // 1. Importar a escala de categoria para o eixo X
    LinearScale,
    BarElement,
    Title,         // Opcional: para o título do gráfico
    Tooltip,       // Opcional: para dicas ao passar o mouse
    Legend         // Opcional: para a legenda
} from "chart.js";

// 2. REGISTRAR OS COMPONENTES: Passo obrigatório no Chart.js 3+
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const arrExpenses = [
    { Categoria: "Alimentação", Valor: 2000 },
    { Categoria: "Transporte", Valor: 1600 },
    { Categoria: "Mercado", Valor: 800 }
];

export default function Chart() {

    const data = {
        // A propriedade 'labels' é opcional se você usa 'parsing', mas ajuda na clareza.
        // Se não quiser, pode remover. O parsing vai extrair do seu array de objetos.
        labels: arrExpenses.map(item => item.Categoria),

        // 3. 'datasets' DEVE SER UM ARRAY
        datasets: [{ // Envolvido em colchetes []
            label: "Relatório de Despesas",
            data: arrExpenses,
            // Dica: passe um array de cores para ter uma cor por barra
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
            parsing: {
                xAxisKey: "Categoria",
                yAxisKey: "Valor" // 4. Corrigido o typo de 'yAxixKey' para 'yAxisKey'
            }
        }]
    };

    const chartOptions = {
        responsive: true, // Garante que o gráfico se ajuste ao tamanho do container
        plugins: {
            legend: {
                position: 'top', // Posição da legenda
            },
            title: {
                display: true,
                text: 'Despesas por Categoria', // Título do gráfico
            },
        },
        scales: {
            // 5. O eixo X é do tipo 'category', não 'linear'
            x: {
                type: 'category', 
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        // Para garantir que o gráfico renderize bem, é bom envolvê-lo em uma div com um tamanho definido
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <Bar data={data} options={chartOptions} />
        </div>
    );
}