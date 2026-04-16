"use client";

import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Button } from "@/src/views/components/ui/button";
import { Transaction } from "@/src/models/entities/transaction";

type ExportPdfButtonProps = {
  transactions: Transaction[];
  fileName?: string;
};

export function ExportPdfButton({ transactions, fileName = "despesas" }: ExportPdfButtonProps) {
  const handleExportPdf = async () => {
    try {
      // Criar elemento para renderizar
      const element = document.createElement("div");
      element.style.position = "absolute";
      element.style.left = "-9999px";
      element.style.width = "800px";
      element.style.backgroundColor = "white";
      element.style.padding = "20px";
      element.style.fontFamily = "Arial, sans-serif";

      // Cabeçalho
      const header = document.createElement("h1");
      header.textContent = "Relatório de Despesas";
      header.style.fontSize = "24px";
      header.style.fontWeight = "bold";
      header.style.marginBottom = "10px";
      header.style.color = "#000";

      // Data
      const dateInfo = document.createElement("p");
      dateInfo.textContent = `Gerado em: ${new Date().toLocaleDateString("pt-BR")}`;
      dateInfo.style.fontSize = "12px";
      dateInfo.style.color = "#666";
      dateInfo.style.marginBottom = "20px";

      // Tabela
      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.style.marginTop = "20px";

      // Headers da tabela
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      headerRow.style.backgroundColor = "#f0f0f0";
      headerRow.style.borderBottom = "2px solid #333";

      ["Data", "Descrição", "Categoria", "Valor", "Tipo"].forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        th.style.padding = "10px";
        th.style.textAlign = "left";
        th.style.fontWeight = "bold";
        th.style.fontSize = "12px";
        th.style.color = "#000";
        th.style.borderBottom = "1px solid #ddd";
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Corpo da tabela
      const tbody = document.createElement("tbody");
      let totalValue = 0;

      transactions.forEach((transaction, index) => {
        const row = document.createElement("tr");
        row.style.borderBottom = "1px solid #ddd";
        if (index % 2 === 0) {
          row.style.backgroundColor = "#fafafa";
        }

        // Data
        const dateCell = document.createElement("td");
        dateCell.textContent = new Date(transaction.date).toLocaleDateString("pt-BR");
        dateCell.style.padding = "10px";
        dateCell.style.fontSize = "11px";
        dateCell.style.color = "#000";

        // Descrição
        const descCell = document.createElement("td");
        descCell.textContent = transaction.description;
        descCell.style.padding = "10px";
        descCell.style.fontSize = "11px";
        descCell.style.color = "#000";

        // Categoria
        const categoryCell = document.createElement("td");
        categoryCell.textContent = transaction.category || "-";
        categoryCell.style.padding = "10px";
        categoryCell.style.fontSize = "11px";
        categoryCell.style.color = "#000";

        // Valor
        const valueCell = document.createElement("td");
        const formattedValue = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Math.abs(transaction.amount));
        valueCell.textContent = formattedValue;
        valueCell.style.padding = "10px";
        valueCell.style.fontSize = "11px";
        valueCell.style.color = transaction.amount < 0 ? "#dc2626" : "#16a34a";
        valueCell.style.fontWeight = "bold";

        // Tipo
        const typeCell = document.createElement("td");
        typeCell.textContent = transaction.amount < 0 ? "Despesa" : "Receita";
        typeCell.style.padding = "10px";
        typeCell.style.fontSize = "11px";
        typeCell.style.color = transaction.amount < 0 ? "#dc2626" : "#16a34a";

        row.appendChild(dateCell);
        row.appendChild(descCell);
        row.appendChild(categoryCell);
        row.appendChild(valueCell);
        row.appendChild(typeCell);
        tbody.appendChild(row);

        totalValue += transaction.amount;
      });

      table.appendChild(tbody);

      // Total
      const totalRow = document.createElement("tr");
      totalRow.style.backgroundColor = "#f0f0f0";
      totalRow.style.borderTop = "2px solid #333";
      totalRow.style.fontWeight = "bold";

      const totalLabel = document.createElement("td");
      totalLabel.textContent = "TOTAL";
      totalLabel.colSpan = 3;
      totalLabel.style.padding = "10px";
      totalLabel.style.fontSize = "12px";
      totalLabel.style.color = "#000";
      totalLabel.style.fontWeight = "bold";

      const totalValue_ = document.createElement("td");
      const formattedTotal = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(totalValue);
      totalValue_.textContent = formattedTotal;
      totalValue_.style.padding = "10px";
      totalValue_.style.fontSize = "12px";
      totalValue_.style.color = totalValue < 0 ? "#dc2626" : "#16a34a";
      totalValue_.style.fontWeight = "bold";

      totalRow.appendChild(totalLabel);
      totalRow.appendChild(totalValue_);
      table.appendChild(totalRow);

      element.appendChild(header);
      element.appendChild(dateInfo);
      element.appendChild(table);
      document.body.appendChild(element);

      // Converter para canvas
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
      });

      // Criar PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
      }

      // Download
      pdf.save(`${fileName}-${new Date().toISOString().split("T")[0]}.pdf`);

      // Limpar
      document.body.removeChild(element);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Tente novamente.");
    }
  };

  return (
    <Button
      onClick={handleExportPdf}
      variant="outline"
      size="sm"
      className="cursor-pointer gap-2"
      disabled={transactions.length === 0}
    >
      <Download size={16} />
      Exportar PDF
    </Button>
  );
}
