import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone, HardDrive, Usb, Wifi, RefreshCw, AlertTriangle, CheckCircle, Info } from "lucide-react";

export const DeviceDetection = () => {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const devices = [
    {
      id: "dev-001",
      name: "Samsung SSD 980",
      type: "SSD",
      capacity: "500 GB",
      interface: "NVMe",
      serial: "S667NX0R123456",
      status: "ready",
      platform: "Windows",
      icon: HardDrive,
      security: {
        encryption: "AES-256",
        secureBoot: true,
        firmwareVersion: "4B2QGXA7"
      }
    },
    {
      id: "dev-002", 
      name: "Seagate BarraCuda",
      type: "HDD",
      capacity: "2 TB",
      interface: "SATA III",
      serial: "ZA123456",
      status: "ready",
      platform: "Linux",
      icon: HardDrive,
      security: {
        encryption: "None",
        secureBoot: false,
        firmwareVersion: "CC43"
      }
    },
    {
      id: "dev-003",
      name: "SanDisk Ultra",
      type: "USB",
      capacity: "64 GB",
      interface: "USB 3.0",
      serial: "AA112233445566",
      status: "ready",
      platform: "Cross-platform",
      icon: Usb,
      security: {
        encryption: "None",
        secureBoot: false,
        firmwareVersion: "1.00"
      }
    },
    {
      id: "dev-004",
      name: "Samsung Galaxy S21",
      type: "Mobile",
      capacity: "128 GB",
      interface: "UFS 3.1",
      serial: "SM-G991B-789012",
      status: "connected",
      platform: "Android",
      icon: Smartphone,
      security: {
        encryption: "AES-256",
        secureBoot: true,
        firmwareVersion: "G991BXXU5FVJJ"
      }
    }
  ];

  const handleScan = async () => {
    setScanning(true);
    setScanProgress(0);
    
    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "success";
      case "connected": return "warning";
      case "busy": return "destructive";
      default: return "secondary";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "windows": return "🪟";
      case "linux": return "🐧";
      case "android": return "🤖";
      default: return "💻";
    }
  };

  return (
    <div className="space-y-6">
      {/* Scan Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-primary" />
            Device Detection & Analysis
          </CardTitle>
          <CardDescription>
            Scan for connected storage devices across Windows, Linux, and Android platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Last scan: 2 minutes ago • {devices.length} devices detected
            </div>
            <Button 
              onClick={handleScan} 
              disabled={scanning}
              variant="outline"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />
              {scanning ? 'Scanning...' : 'Scan Devices'}
            </Button>
          </div>

          {scanning && (
            <div className="space-y-2">
              <Progress value={scanProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Scanning connected devices... {scanProgress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Platform Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Devices</TabsTrigger>
          <TabsTrigger value="windows">🪟 Windows</TabsTrigger>
          <TabsTrigger value="linux">🐧 Linux</TabsTrigger>
          <TabsTrigger value="android">🤖 Android</TabsTrigger>
          <TabsTrigger value="bootable">💿 Bootable</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <Card key={device.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{device.name}</CardTitle>
                          <CardDescription>
                            {device.capacity} • {device.interface}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getPlatformIcon(device.platform)}</span>
                        <Badge variant="outline" className={`border-${getStatusColor(device.status)}/20 bg-${getStatusColor(device.status)}/10 text-${getStatusColor(device.status)}`}>
                          {device.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="font-medium text-muted-foreground">Serial Number</label>
                        <p className="font-mono">{device.serial}</p>
                      </div>
                      <div>
                        <label className="font-medium text-muted-foreground">Type</label>
                        <p>{device.type}</p>
                      </div>
                    </div>

                    {/* Security Information */}
                    <div className="space-y-2">
                      <label className="font-medium text-muted-foreground">Security Features</label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={device.security.encryption !== "None" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                          {device.security.encryption !== "None" ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          )}
                          {device.security.encryption}
                        </Badge>
                        <Badge variant="outline" className={device.security.secureBoot ? "bg-success/10 text-success border-success/20" : "bg-muted/10"}>
                          {device.security.secureBoot ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <Info className="mr-1 h-3 w-3" />
                          )}
                          Secure Boot
                        </Badge>
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Device ready for secure wipe using {device.type === "SSD" ? "TRIM/Crypto Erase" : "NIST SP 800-88"} method
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="bootable" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Bootable Wipe Environment:</strong> For maximum security, create a bootable USB/ISO 
              that can wipe devices without loading the host operating system.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Create Bootable USB</CardTitle>
                <CardDescription>Generate a bootable USB drive for offline wiping</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Usb className="mr-2 h-4 w-4" />
                  Create Bootable USB
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Download ISO Image</CardTitle>
                <CardDescription>Download ISO for CD/DVD or virtual machine</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Monitor className="mr-2 h-4 w-4" />
                  Download ISO (2.1 GB)
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};