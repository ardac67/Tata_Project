-- AddForeignKey
ALTER TABLE "collaboration" ADD CONSTRAINT "collaboration_proposed_user_id_fkey" FOREIGN KEY ("proposed_user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
