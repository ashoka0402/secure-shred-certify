import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, HardDrive, Smartphone, Shield, FileCheck, Monitor, Download } from "lucide-react";
import { WipeOperation } from "./WipeOperation";
import { CertificateViewer } from "./CertificateViewer";
import { DeviceDetection } from "./DeviceDetection";
import { AuditLog } from "./AuditLog";

export const SecurityDashboard = () => {
  const [activeWipes, setActiveWipes] = useState(0);
  const [completedWipes, setCompletedWipes] = useState(247);
  const [certificates, setCertificates] = useState(247);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SecureWipe Pro</h1>
                <p className="text-sm text-muted-foreground">NIST SP 800-88 Compliant Data Destruction</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <CheckCircle className="mr-1 h-3 w-3" />
                NIST Certified
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Logs
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Wipes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{activeWipes}</div>
              <p className="text-xs text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>

          <Card className="border-success/20 bg-gradient-to-br from-success/5 to-success/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Wipes</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{completedWipes}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Digital Certificates</CardTitle>
              <FileCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certificates}</div>
              <p className="text-xs text-muted-foreground">Tamper-proof certificates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devices Detected</CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Ready for secure wipe</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="wipe" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="wipe" className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              Secure Wipe
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Device Detection
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Audit Trail
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wipe">
            <WipeOperation 
              onWipeStart={() => setActiveWipes(prev => prev + 1)}
              onWipeComplete={() => {
                setActiveWipes(prev => Math.max(0, prev - 1));
                setCompletedWipes(prev => prev + 1);
                setCertificates(prev => prev + 1);
              }}
            />
          </TabsContent>

          <TabsContent value="devices">
            <DeviceDetection />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificateViewer />
          </TabsContent>

          <TabsContent value="audit">
            <AuditLog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};