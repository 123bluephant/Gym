import { Button } from '../ui/button';
import { FiDownload, FiFileText } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export const ExportEquipment = ({ equipment }: { equipment: any[] }) => {
  const exportToCSV = () => {
    if (equipment.length === 0) {
      toast.error('No equipment to export');
      return;
    }

    const headers = Object.keys(equipment[0]).join(',');
    const rows = equipment.map(item => 
      Object.values(item).map(value => 
        typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
      ).join(',')
    ).join('\n');

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `equipment_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Equipment exported successfully!');
  };

  const exportToJSON = () => {
    if (equipment.length === 0) {
      toast.error('No equipment to export');
      return;
    }

    const jsonContent = JSON.stringify(equipment, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `equipment_export_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Equipment exported successfully!');
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={exportToCSV}>
        <FiDownload className="mr-2" />
        Export as CSV
      </Button>
      <Button variant="outline" onClick={exportToJSON}>
        <FiFileText className="mr-2" />
        Export as JSON
      </Button>
    </div>
  );
};