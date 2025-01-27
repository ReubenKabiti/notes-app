-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_user_id_fkey`;

-- DropIndex
DROP INDEX `Note_user_id_fkey` ON `note`;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
