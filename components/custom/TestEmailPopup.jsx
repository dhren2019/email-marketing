// Importaciones necesarias
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const TestEmailPopup = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [smtpData, setSmtpData] = useState({
    host: '',
    port: '',
    user: '',
    password: '',
    recipient: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSmtpData({ ...smtpData, [name]: value });
  };

  const sendTestEmail = async () => {
    try {
      const response = await fetch('/api/send-test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smtpData),
      });
      const result = await response.json();
      alert(result.message || 'Email sent successfully!');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error sending test email:', error);
      alert('Failed to send test email.');
    }
  };

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)}>Test Email</Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>Send Test Email</DialogHeader>
          <div className="space-y-4">
            <Input
              name="host"
              placeholder="SMTP Host"
              value={smtpData.host}
              onChange={handleInputChange}
            />
            <Input
              name="port"
              placeholder="SMTP Port"
              value={smtpData.port}
              onChange={handleInputChange}
            />
            <Input
              name="user"
              placeholder="SMTP User"
              value={smtpData.user}
              onChange={handleInputChange}
            />
            <Input
              name="password"
              placeholder="SMTP Password"
              type="password"
              value={smtpData.password}
              onChange={handleInputChange}
            />
            <Input
              name="recipient"
              placeholder="Recipient Email"
              value={smtpData.recipient}
              onChange={handleInputChange}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendTestEmail}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestEmailPopup;
