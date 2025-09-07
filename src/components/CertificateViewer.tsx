import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileCheck, Download, Eye, Shield, Calendar, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const CertificateViewer = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const certificates = [
    {
      id: "CERT-2024-001247",
      deviceName: "Samsung SSD 980 (500GB)",
      deviceSerial: "S667NX0R123456",
      method: "NIST SP 800-88",
      timestamp: "2024-01-15 14:32:18 UTC",
      status: "Verified",
      signature: "SHA256:a1b2c3d4e5f6...",
      fileSize: "2.3 MB",
      blockchainAnchor: "0x1a2b3c4d5e6f...",
    },
    {
      id: "CERT-2024-001246",
      deviceName: "Seagate BarraCuda (2TB)",
      deviceSerial: "ZA123456",
      method: "DoD 5220.22-M",
      timestamp: "2024-01-15 11:15:42 UTC",
      status: "Verified",
      signature: "SHA256:f6e5d4c3b2a1...",
      fileSize: "3.1 MB",
      blockchainAnchor: "0x6f5e4d3c2b1a...",
    },
    {
      id: "CERT-2024-001245",
      deviceName: "SanDisk USB Drive (64GB)",
      deviceSerial: "AA112233445566",
      method: "NIST SP 800-88",
      timestamp: "2024-01-14 16:45:12 UTC",
      status: "Verified",
      signature: "SHA256:123abc456def...",
      fileSize: "1.8 MB",
      blockchainAnchor: "0xabc123def456...",
    }
  ];

  const handleDownloadCertificate = (certificate: any, format: string) => {
    toast.success(`Downloading certificate ${certificate.id} as ${format.toUpperCase()}`);
  };

  const CertificateDetail = ({ certificate }: { certificate: any }) => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Digital Wipe Certificate</h3>
          <p className="text-sm text-muted-foreground">Certificate ID: {certificate.id}</p>
        </div>
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          <CheckCircle className="mr-1 h-3 w-3" />
          Verified
        </Badge>
      </div>

      {/* Certificate Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Device Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Device Name</label>
              <p className="text-sm">{certificate.deviceName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Serial Number</label>
              <p className="text-sm font-mono">{certificate.deviceSerial}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Wipe Method</label>
              <p className="text-sm">{certificate.method}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Security Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Digital Signature</label>
              <p className="text-sm font-mono break-all">{certificate.signature}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Blockchain Anchor</label>
              <p className="text-sm font-mono break-all">{certificate.blockchainAnchor}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
              <p className="text-sm">{certificate.timestamp}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download Options */}
      <div className="flex gap-3">
        <Button 
          onClick={() => handleDownloadCertificate(certificate, 'pdf')}
          className="flex-1"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button 
          variant="outline"
          onClick={() => handleDownloadCertificate(certificate, 'json')}
          className="flex-1"
        >
          <Download className="mr-2 h-4 w-4" />
          Download JSON
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary" />
            Digital Wipe Certificates
          </CardTitle>
          <CardDescription>
            Tamper-proof certificates providing legal proof of secure data destruction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm">All certificates are digitally signed and blockchain-anchored</span>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {certificates.length} Certificates
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificate Registry</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-mono text-sm">{cert.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{cert.deviceName}</div>
                      <div className="text-sm text-muted-foreground">{cert.deviceSerial}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{cert.method}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{cert.timestamp.split(' ')[0]}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedCertificate(cert)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Certificate Details</DialogTitle>
                            <DialogDescription>
                              Detailed view of the digital wipe certificate
                            </DialogDescription>
                          </DialogHeader>
                          <CertificateDetail certificate={cert} />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadCertificate(cert, 'pdf')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};