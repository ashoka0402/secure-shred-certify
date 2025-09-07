import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Search, Filter, Download, AlertTriangle, CheckCircle, Clock, Eye, FileText } from "lucide-react";

export const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const auditEntries = [
    {
      id: "AUD-2024-001247",
      timestamp: "2024-01-15 14:32:18",
      event: "Wipe Completed",
      device: "Samsung SSD 980 (S667NX0R123456)",
      method: "NIST SP 800-88",
      user: "admin@company.com",
      status: "Success",
      details: "Full device wipe completed successfully. Certificate generated.",
      duration: "00:12:34",
      certificateId: "CERT-2024-001247"
    },
    {
      id: "AUD-2024-001246",
      timestamp: "2024-01-15 14:19:44",
      event: "Wipe Started",
      device: "Samsung SSD 980 (S667NX0R123456)",
      method: "NIST SP 800-88",
      user: "admin@company.com",
      status: "Info",
      details: "Secure wipe operation initiated on device",
      duration: "-",
      certificateId: "-"
    },
    {
      id: "AUD-2024-001245",
      timestamp: "2024-01-15 11:28:56",
      event: "Device Detected",
      device: "Samsung SSD 980 (S667NX0R123456)",
      method: "-",
      user: "system",
      status: "Info",
      details: "New storage device detected and registered",
      duration: "-",
      certificateId: "-"
    },
    {
      id: "AUD-2024-001244",
      timestamp: "2024-01-15 11:15:42",
      event: "Wipe Completed",
      device: "Seagate BarraCuda (ZA123456)",
      method: "DoD 5220.22-M",
      user: "admin@company.com",
      status: "Success",
      details: "Three-pass wipe completed successfully. Certificate generated.",
      duration: "01:45:12",
      certificateId: "CERT-2024-001246"
    },
    {
      id: "AUD-2024-001243",
      timestamp: "2024-01-15 09:30:30",
      event: "Login",
      device: "-",
      method: "-",
      user: "admin@company.com",
      status: "Success",
      details: "User authenticated successfully",
      duration: "-",
      certificateId: "-"
    },
    {
      id: "AUD-2024-001242",
      timestamp: "2024-01-14 16:45:12",
      event: "Wipe Failed",
      device: "Unknown Device (ERR123)",
      method: "NIST SP 800-88",
      user: "admin@company.com",
      status: "Error",
      details: "Device disconnected during wipe operation",
      duration: "00:05:23",
      certificateId: "-"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success": return <CheckCircle className="h-4 w-4 text-success" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "info": return <Clock className="h-4 w-4 text-primary" />;
      default: return <Shield className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success": return "success";
      case "error": return "destructive";
      case "info": return "secondary";
      default: return "secondary";
    }
  };

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = searchTerm === "" || 
      entry.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || 
      entry.status.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handleExportLogs = () => {
    console.log("Exporting audit logs...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Audit Trail
          </CardTitle>
          <CardDescription>
            Complete log of all security operations and system events for compliance and forensic analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events, devices, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="success">Success Only</SelectItem>
                <SelectItem value="error">Errors Only</SelectItem>
                <SelectItem value="info">Info Only</SelectItem>
              </SelectContent>
            </Select>

            {/* Export */}
            <Button variant="outline" onClick={handleExportLogs}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Events ({filteredEntries.length})</CardTitle>
          <CardDescription>
            Chronological record of all system activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono text-sm">
                    {entry.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(entry.status)}
                      <div>
                        <div className="font-medium">{entry.event}</div>
                        {entry.method && entry.method !== "-" && (
                          <div className="text-sm text-muted-foreground">{entry.method}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={entry.device}>
                      {entry.device !== "-" ? entry.device : "-"}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{entry.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`border-${getStatusColor(entry.status)}/20 bg-${getStatusColor(entry.status)}/10 text-${getStatusColor(entry.status)}`}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {entry.duration}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {entry.certificateId !== "-" && (
                        <Button variant="ghost" size="sm" title="View Certificate">
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredEntries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No audit entries found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance Information */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Compliance & Retention
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="font-medium">Retention Period</label>
              <p className="text-muted-foreground">7 years (GDPR compliant)</p>
            </div>
            <div>
              <label className="font-medium">Log Integrity</label>
              <p className="text-muted-foreground">SHA-256 checksums verified</p>
            </div>
            <div>
              <label className="font-medium">Export Format</label>
              <p className="text-muted-foreground">JSON, CSV, SIEM-compatible</p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            All audit logs are cryptographically signed and stored with immutable timestamps to ensure 
            compliance with ISO 27001, SOX, and GDPR requirements.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};